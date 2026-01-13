function process(root) {
  // 存入推送时间到redis
  var nowDate = util.formatDateTimeHR(new Date());
  var getUpdateDate = util.cache("get", "updateDate_shipments");
  util.cache("delete", "updateDate_shipments");
  log.error("存储时间{}=={}", getUpdateDate, nowDate);
  var param_time = {
    createDate: getUpdateDate || "2024-04-09 10:00:00",
    nowDate: nowDate,
  };

  // 查询时间段总条数
  var sql =
    "SELECT COUNT(*) as 'count' FROM K_EDS_SALEOUTMT WITH (NOLOCK) WHERE ReturnCode IS NOT NULL AND RuleId = '4szcn61oa8b0tz79' AND IsDone = 'N'";
  var total = dbutil.selectOne(sql, param_time).count;
  if (total == 0) {
    util.cache("set", "updateDate_shipments", nowDate);
    return;
  }
  var size = 20;
  var page = Math.ceil(total / size);

  // 循环进行分页处理
  for (var j = 1; j <= page; j++) {
    var sql =
      "SELECT * FROM K_EDS_SALEOUTMT WITH (NOLOCK) WHERE ReturnCode IS NOT NULL AND RuleId = '4szcn61oa8b0tz79' AND IsDone = 'N'";
    var inventoryList = dbutil.page(sql, param_time, j, size).list;

    for (var i = 0; i < inventoryList.length; i++) {
      var inventory = inventoryList[i];
      var soleId = JSON.stringify({
        k_wlddh: inventoryList[i].k_wlddh,
      });
      var param = {
        deliveryId: inventory.k_widd_id,
        deliverySn: inventory.k_wlddh,
        deliveryType: inventory.delivery,
        expressCompany: inventory.expresscompany,
        cpCode: inventory.logisticscode,
        expressNum: inventory.returncode,
        zbBillCode: inventory.zbbillcode,
        billNo: inventory.billno,
      };
      var sql_goods =
        "SELECT * FROM K_EDS_SALEOUTDT WITH (NOLOCK) WHERE k_wlddh = :deliverySn AND billno = :billNo";
      var goods = dbutil.select(sql_goods, param);
      log.error("发货单明细{}", JSON.stringify(goods));
      param.store = goods[0].whname;
      var goodList = [];
      var tempMap = {}; // 临时映射表

      // 遍历输入数组，构建tempMap
      goods.forEach(function (item) {
        var id = item.goodsid;
        if (!tempMap[id]) {
          // 如果tempMap中还没有这个id，就初始化它
          tempMap[id] = {
            skuId: item.skuid,
            erpCode: id,
            basicUnit: item.unit,
            quantity: item.num,
            isFirstSell: item.k_is_first,
            produceInfoList: [],
          };
        }
        // 将name作为一个对象添加到对应的list中
        tempMap[id].produceInfoList.push({
          produce: item.batchcode,
          productionTime: item.producedate,
          effectiveTime: item.valdate,
          quantity: item.num,
        });
      });

      for (var key in tempMap) {
        if (tempMap.hasOwnProperty(key)) {
          goodList.push(tempMap[key]);
        }
      }
      param.deliveryOrderItemDTOList = goodList;
      log.error("【发货通知】传递参数：{}", JSON.stringify(param));

      var token = util.cache("get", "accessToken");
      var getToken = dbutil.selectOne("SELECT accessToken FROM AccessToken");
      var header = {
        Authorization: token || getToken.accesstoken,
      };
      try {
        var result = httpclient.postJSON(
          util.getParameter("url") + "/erp/logistic",
          header,
          param,
        );
        var resultObj = JSON.parse(result.body);

        if (!resultObj.success) {
          var param_error = {
            id: soleId,
            type: "发货通知",
            errorInfo: resultObj.message,
            createDate: nowDate,
          };
          var nowDate_1 = util.formatDateTimeHR(new Date());
          var insert = dbutil.update(
            "INSERT INTO INSERT_ERROR_INFO (id,type,error_info,create_date) values (:id,:type,:errorInfo,:createDate)",
            param_error,
          );
          var update = dbutil.update(
            "UPDATE K_EDS_SALEOUTMT SET LastModifyTime = :LastModifyTime WHERE K_WLDDH = :k_wlddh",
            { LastModifyTime: nowDate_1, k_wlddh: inventory.k_wlddh },
          );
        } else {
          var update = dbutil.update(
            "UPDATE K_EDS_SALEOUTMT SET IsDone = 'Y' WHERE K_WLDDH = :k_wlddh",
            { k_wlddh: inventory.k_wlddh },
          );
        }
      } catch (e) {
        var param_2 = {
          id: soleId,
          type: "发货通知",
          errorInfo: JSON.stringify(e),
          createDate: nowDate,
        };
        var nowDate_2 = util.formatDateTimeHR(new Date());
        var update = dbutil.update(
          "UPDATE K_EDS_SALEOUTMT SET LastModifyTime = :LastModifyTime WHERE K_WLDDH = :k_wlddh",
          { LastModifyTime: nowDate_2, k_wlddh: inventoryList[i].k_wlddh },
        );
        var insert = dbutil.update(
          "INSERT INTO INSERT_ERROR_INFO (id,type,error_info,create_date) values (:id,:type,:errorInfo,:createDate)",
          param_2,
        );
      }
    }

    // GOODS_EDS_KC
    var redis = util.cache("set", "updateDate_shipments", nowDate);
  }
}
