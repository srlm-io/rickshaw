Rickshaw.namespace('Rickshaw.Graph.Marker');

Rickshaw.Graph.Marker = Rickshaw.Class.create({
    initialize: function(args){
        this.graph = args.graph;
        
        var element = this.element = document.createElement('div');
        element.className = 'marker';

        this.graph.element.appendChild(element);
        this.hide();
    },
    setX: function(newX){
        this.element.style.left = this.graph.x(newX) + 'px';
    },
    show: function(){
        this.element.classList.remove('inactive');
    },
    hide: function(){
        this.element.classList.add('inactive');
    }
});
