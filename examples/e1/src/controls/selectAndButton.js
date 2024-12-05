L.Control.SelectAndButton = L.Control.extend({
    options: {
        position: 'topleft', // 控件位置
        columns: [],         // 下拉框选项
        buttonName: 'Show',  // 按钮名称
        info: 'Select a column to show', // 信息文本
        onButtonClick: null  // 按钮点击回调函数
    },

    initialize: function (options) {
        L.Util.setOptions(this, options); // 合并选项
    },

    onAdd: function (map) {
        // 创建控件主容器
        const container = L.DomUtil.create('div', 'leaflet-control-select-button');

        // 防止控件与地图拖动交互冲突
        L.DomEvent.disableClickPropagation(container);

        // 创建信息文本
        const infoElement = L.DomUtil.create('div', 'select-button-info', container);
        infoElement.innerText = this.options.info;

        // 创建下拉框
        const select = L.DomUtil.create('select', 'select-button-dropdown', container);
        select.id = `dropdown-${L.Util.stamp(this)}`; // 添加唯一 ID
        this.options.columns.forEach(option => {
            const optionElement = L.DomUtil.create('option', '', select);
            optionElement.value = option;
            optionElement.innerText = option;
        });

        // 创建按钮
        const button = L.DomUtil.create('button', 'select-button-button', container);
        button.innerText = this.options.buttonName;
        button.onclick = () => {
            const selectedColumn = select.value;
            if (this.options.onButtonClick) {
                this.options.onButtonClick(selectedColumn);
            }
        };

        return container;
    }
});

// 工厂方法
L.control.selectAndButton = function (options) {
    return new L.Control.SelectAndButton(options);
};


export default L.Control.SelectAndButton;