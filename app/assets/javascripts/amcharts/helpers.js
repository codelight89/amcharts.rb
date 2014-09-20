AmCharts.RB.Helpers = {
  create_unit: function(num, unit)
  {
    // If the number doesn't end with a unit already, add the given one
    return num.toString().match(/\d$/) ? num + unit : num;
  },

  add_container_if_needed: function(id, width, height)
  {
    var container = document.getElementById(id);

    if (!container) {
      container = document.createElement("DIV");
      container.className = 'chart';
      container.id = id;
      if (width) container.style.width = this.create_unit(width, 'px');
      container.style.height = this.create_unit(height, 'px');

      // Add the container before the last script
      var scripts = document.getElementsByTagName('script');
      var this_script = scripts[scripts.length - 1];
      this_script.parentNode.insertBefore(container, this_script);
    }

    return container;
  },

  add_blanket: function(container)
  {
    var wrapper = document.createElement("DIV"),
      blanket = document.createElement("DIV"),
      blanket_container = document.createElement("DIV"),
      blanket_outer = document.createElement("DIV"),
      blanket_inner = document.createElement("DIV");

    wrapper.className = 'chart-wrapper';
    wrapper.id = container.id + "_wrapper";
    wrapper.style.width = container.style.width;
    wrapper.style.minHeight = container.style.height;

    container.style.width = '100%';
    blanket.className = 'chart-blanket';
    blanket.style.display = 'none';

    container.parentNode.insertBefore(wrapper, container);

    blanket_inner.className = 'chart-blanket-inner';

    blanket_outer.appendChild(blanket_inner);
    blanket_container.appendChild(blanket_outer);
    blanket.appendChild(blanket_container);

    wrapper.appendChild(blanket);
    wrapper.appendChild(container);
  },

  get_wrapper: function(container)
  {
    var wrapper = container;
    while (wrapper && (" " + wrapper.className + " ").indexOf(" chart-wrapper ") < 0) {
      wrapper = wrapper.parentElement;
    }

    return wrapper;
  },

  get_blanket: function(container)
  {
    var wrapper = this.get_wrapper(container);
    return getElementsByClassName('chart-blanket', wrapper)[0];
  },

  add_loading_indicator: function(container, message, image_path) {
    var loading_div = document.createElement("DIV"),
        loading_image = document.createElement("IMG"),
        loading = document.createTextNode(message),
        blanket = this.get_blanket(container),
        blanket_inner = blanket.childNodes[0].childNodes[0].childNodes[0];

    loading_div.className = 'chart-loading';
    loading_image.className = 'chart-loading-image';
    loading_image.src = image_path;

    loading_div.appendChild(loading);

    blanket.style.display = '';
    blanket_inner.innerHTML = "";
    blanket_inner.appendChild(loading_div);
    blanket_inner.appendChild(loading_image);
  },

  hide_loading_indicator: function(chart) {
    // If data is updated but still empty, keep the indicator up
    if (!chart.dataProvider.length) return;

    var container = chart.container.div,
        blanket = AmCharts.RB.Helpers.get_blanket(container);

    if (blanket) blanket.style.display = 'none';
  },

  // If the chart is provided by a remote provider which is loaded immediately (not defered),
  // and the provider has loaded before the chart has, reload the chart with the data
  load_from_immediate_provider: function(chart) {
    if (chart.remoteProvider && chart.remoteProvider.loaded() && !chart.dataProvider.length)
    {
      new AmCharts.RB.Chart(chart).load_data(chart.remoteProvider.data);
    }
  },

  add_legend_div: function(id, main_div) {
    var legend = document.getElementById(id);

    if (!legend) {
      legend = document.createElement("DIV");
      legend.className = 'chart-legend';
      legend.id = id;
      legend.style.width = main_div.getWidth() + 'px';

      var wrapper = main_div.parentNode;
      if (main_div.nextSibling) {
        wrapper.insertBefore(legend, main_div.nextSibling);
      }
      else {
        wrapper.appendChild(legend);
      }
    }

    return legend;
  }
}