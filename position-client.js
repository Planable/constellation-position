// Hook in to constellation UI

var Constellation = Package["constellation:console"].API;

var initialLRvalue = localStorage.constellation_position_lr || 'left';
var initialTBvalue = localStorage.constellation_position_tb || 'bottom';

Constellation.addTab({
  name: 'Position',
  id: 'position',
  headerContentTemplate: 'Constellation_position',
  guideContentTemplate: 'Constellation_position_guide',
  noOpen:true,
  onClick: "positionCloseConstellation",
  title: "Hide Constellation",
  addBaseClass: 'constellation-position-' + initialLRvalue + '-' + initialTBvalue
});

Constellation.registerCallbacks({
  positionCloseConstellation : function () {
    Constellation.toggleConsole();
  }
});

PositionDict = new ReactiveDict('constellation-position');

PositionDict.set('Constellation_position_lr', initialLRvalue);
PositionDict.set('Constellation_position_tb', initialTBvalue);

var resetBaseClasses = function () {
  var lr = PositionDict.get('Constellation_position_lr');
  var tb = PositionDict.get('Constellation_position_tb');
  _.each(['left-top','left-bottom','right-top','right-bottom'], function (pos) {
    Constellation.removeBaseClass('constellation-position-' + pos);
  });
  Constellation.addBaseClass('constellation-position-' + lr + '-' + tb);
}

Template.Constellation_position.helpers({
  active: function (axis, pos) {
	return (PositionDict.equals('Constellation_position_' + axis, pos)) ? 'constellation-menu-button-active' : '';
  }
});

Template.Constellation_position.events({
  'click .constellation-toggle-lr' : function (evt) {
	evt.stopPropagation();
    lrVal = PositionDict.get('Constellation_position_lr');
	PositionDict.set('Constellation_position_lr', (lrVal === 'left') ? 'right' : 'left');
	localStorage.constellation_position_lr = PositionDict.get('Constellation_position_lr');
	resetBaseClasses();
  },
  'click .constellation-toggle-tb' : function (evt) {
	evt.stopPropagation();
    tbVal = PositionDict.get('Constellation_position_tb');
	PositionDict.set('Constellation_position_tb', (tbVal === 'bottom') ? 'top' : 'bottom');
	localStorage.constellation_position_tb = PositionDict.get('Constellation_position_tb');
	resetBaseClasses();
  }
});

Template.Constellation_trigger_target.helpers({
  constellationActive : function () {
	return !Constellation.isActive() && Constellation.tabVisible('position','plugin');  
  },
  position : function (axis, pos) {
	return (PositionDict.equals('Constellation_position_' + axis, pos)) ? '10px' : 'auto';
  }
});

Template.Constellation_trigger_target.events({
  'click .constellation-trigger-target' : function () {
	Constellation.toggleConsole();
  }
});

Meteor.startup(function () {
  Meteor.defer(function () {
    Blaze.render(Template.Constellation_trigger_target, document.body);
  });
});