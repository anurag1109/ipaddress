const ipvalidator = (req, res, next) => {

    const ipaddress = req.params.ipaddress;

    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipaddress)) {
        return res.status(400).send({ error: "Invalid IP address" })
    }
    next()
}
module.exports ={ipvalidator}