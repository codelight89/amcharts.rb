AmCharts.AmPieChart=AmCharts.Class({inherits:AmCharts.AmSlicedChart,construct:function(e){this.type="pie";AmCharts.AmPieChart.base.construct.call(this,e);this.cname="AmPieChart";this.pieBrightnessStep=30;this.minRadius=10;this.depth3D=0;this.startAngle=90;this.angle=this.innerRadius=0;this.startRadius="500%";this.pullOutRadius="20%";this.labelRadius=20;this.labelText="[[title]]: [[percents]]%";this.balloonText="[[title]]: [[percents]]% ([[value]])\n[[description]]";this.previousScale=1;AmCharts.applyTheme(this,
e,this.cname)},drawChart:function(){AmCharts.AmPieChart.base.drawChart.call(this);var e=this.chartData;if(AmCharts.ifArray(e)){if(0<this.realWidth&&0<this.realHeight){AmCharts.VML&&(this.startAlpha=1);var g=this.startDuration,c=this.container,b=this.updateWidth();this.realWidth=b;var h=this.updateHeight();this.realHeight=h;var d=AmCharts.toCoordinate,k=d(this.marginLeft,b),a=d(this.marginRight,b),q=d(this.marginTop,h)+this.getTitleHeight(),l=d(this.marginBottom,h),v,w,f,s=AmCharts.toNumber(this.labelRadius),
r=this.measureMaxLabel();this.labelText&&this.labelsEnabled||(s=r=0);v=void 0===this.pieX?(b-k-a)/2+k:d(this.pieX,this.realWidth);w=void 0===this.pieY?(h-q-l)/2+q:d(this.pieY,h);f=d(this.radius,b,h);f||(b=0<=s?b-k-a-2*r:b-k-a,h=h-q-l,f=Math.min(b,h),h<b&&(f/=1-this.angle/90,f>b&&(f=b)),h=AmCharts.toCoordinate(this.pullOutRadius,f),f=(0<=s?f-1.8*(s+h):f-1.8*h)/2);f<this.minRadius&&(f=this.minRadius);h=d(this.pullOutRadius,f);q=AmCharts.toCoordinate(this.startRadius,f);d=d(this.innerRadius,f);d>=f&&
(d=f-1);l=AmCharts.fitToBounds(this.startAngle,0,360);0<this.depth3D&&(l=270<=l?270:90);l-=90;b=f-f*this.angle/90;for(k=0;k<e.length;k++)if(a=e[k],!0!==a.hidden&&0<a.percents){var m=360*a.percents/100,r=Math.sin((l+m/2)/180*Math.PI),x=-Math.cos((l+m/2)/180*Math.PI)*(b/f),p=this.outlineColor;p||(p=a.color);var t=this.alpha;isNaN(a.alpha)||(t=a.alpha);p={fill:a.color,stroke:p,"stroke-width":this.outlineThickness,"stroke-opacity":this.outlineAlpha,"fill-opacity":t};a.url&&(p.cursor="pointer");p=AmCharts.wedge(c,
v,w,l,m,f,b,d,this.depth3D,p,this.gradientRatio,a.pattern);this.addEventListeners(p,a);a.startAngle=l;e[k].wedge=p;0<g&&(this.chartCreated||p.setAttr("opacity",this.startAlpha));a.ix=r;a.iy=x;a.wedge=p;a.index=k;if(this.labelsEnabled&&this.labelText&&a.percents>=this.hideLabelsPercent){var n=l+m/2,m=s;isNaN(a.labelRadius)||(m=a.labelRadius);var t=v+r*(f+m),B=w+x*(f+m),y,u=0;if(0<=m){var z;90>=n&&0<=n?(z=0,y="start",u=8):90<=n&&180>n?(z=1,y="start",u=8):180<=n&&270>n?(z=2,y="end",u=-8):270<=n&&360>
n&&(z=3,y="end",u=-8);a.labelQuarter=z}else y="middle";var n=this.formatString(this.labelText,a),A=a.labelColor;A||(A=this.color);n=AmCharts.text(c,n,A,this.fontFamily,this.fontSize,y);n.translate(t+1.5*u,B);a.tx=t+1.5*u;a.ty=B;0<=m?p.push(n):this.freeLabelsSet.push(n);a.label=n;a.tx=t;a.tx2=t+u;a.tx0=v+r*f;a.ty0=w+x*f}m=d+(f-d)/2;a.pulled&&(m+=this.pullOutRadiusReal);a.balloonX=r*m+v;a.balloonY=x*m+w;a.startX=Math.round(r*q);a.startY=Math.round(x*q);a.pullX=Math.round(r*h);a.pullY=Math.round(x*h);
this.graphsSet.push(p);(0===a.alpha||0<g&&!this.chartCreated)&&p.hide();l+=360*a.percents/100}0<s&&!this.labelRadiusField&&this.arrangeLabels();this.pieXReal=v;this.pieYReal=w;this.radiusReal=f;this.innerRadiusReal=d;0<s&&this.drawTicks();this.initialStart();this.setDepths()}(e=this.legend)&&e.invalidateSize()}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},setDepths:function(){var e=this.chartData,g;for(g=0;g<e.length;g++){var c=e[g],b=c.wedge,c=c.startAngle;0<=c&&180>c?b.toFront():
180<=c&&b.toBack()}},arrangeLabels:function(){var e=this.chartData,g=e.length,c,b;for(b=g-1;0<=b;b--)c=e[b],0!==c.labelQuarter||c.hidden||this.checkOverlapping(b,c,0,!0,0);for(b=0;b<g;b++)c=e[b],1!=c.labelQuarter||c.hidden||this.checkOverlapping(b,c,1,!1,0);for(b=g-1;0<=b;b--)c=e[b],2!=c.labelQuarter||c.hidden||this.checkOverlapping(b,c,2,!0,0);for(b=0;b<g;b++)c=e[b],3!=c.labelQuarter||c.hidden||this.checkOverlapping(b,c,3,!1,0)},checkOverlapping:function(e,g,c,b,h){var d,k,a=this.chartData,q=a.length,
l=g.label;if(l){if(!0===b)for(k=e+1;k<q;k++)a[k].labelQuarter==c&&(d=this.checkOverlappingReal(g,a[k],c))&&(k=q);else for(k=e-1;0<=k;k--)a[k].labelQuarter==c&&(d=this.checkOverlappingReal(g,a[k],c))&&(k=0);!0===d&&100>h&&(d=g.ty+3*g.iy,g.ty=d,l.translate(g.tx2,d),this.checkOverlapping(e,g,c,b,h+1))}},checkOverlappingReal:function(e,g,c){var b=!1,h=e.label,d=g.label;e.labelQuarter!=c||e.hidden||g.hidden||!d||(h=h.getBBox(),c={},c.width=h.width,c.height=h.height,c.y=e.ty,c.x=e.tx,e=d.getBBox(),d={},
d.width=e.width,d.height=e.height,d.y=g.ty,d.x=g.tx,AmCharts.hitTest(c,d)&&(b=!0));return b}});