interface obj {
    type: string,
    url: string,
    data?: Object,
    async: boolean
}

function Ajax(obj: obj){
    this.type = obj.type
    this.url = obj.url
    this.data = obj.data || ''
    this.async = obj.async
}
Ajax.prototype.request = function(cb: (a: Object)=>string){
    var _ = this;
    $.ajax({
        type:_.type,
        url:_.url,
        data:_.data,
        async: _.async,
        timeout: 1000 * 10,
        success:function(result){
            cb(result);
        },
        error:function(err){
            cb(err);
        }
    })
}

export = Ajax;  // ts写法       =      module.exports = Ajax