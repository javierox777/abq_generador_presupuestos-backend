const SALES = require("../../model/sale/sale")
const _ = require("lodash")
const moment = require("moment")

const ctrls = {}

ctrls.allSalesMonth = async (req, res) => {
    const datas = await SALES.find()

    const d = datas.map((e) => {

        return {
            mes: moment(e.date).format("MMM"),    
            total: e.total, seller: e.seller
        }
    })


    let data = _(d)
        .groupBy('mes')
        .map((objs, key) => {
            return {
                'mes': key,
                'total': _.sumBy(objs, 'total')
            }
        })
        .value();

    res.json({
        data
    })
    console.log(d)
}




module.exports = ctrls