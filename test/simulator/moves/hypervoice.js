var assert = require('assert');
var battle;

describe('Hyper Voice', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should pierce through substitutes', function () {
		battle = BattleEngine.Battle.construct();
		battle.join('p1', 'Guest 1', 1, [{species: "Deoxys-Attack", ability: 'victorystar', item: 'laggingtail', moves: ['splash', 'hypervoice']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Caterpie", level: 2, ability: 'naturalcure', item: 'focussash', moves: ['substitute', 'rest']}]);
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].item, '');
	});
});

describe('Hyper Voice [Gen 5]', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should not pierce through substitutes', function () {
		battle = BattleEngine.Battle.construct('battle-hypervoice-bw', 'gen5customgame');
		battle.join('p1', 'Guest 1', 1, [{species: "Deoxys-Attack", ability: 'victorystar', item: 'laggingtail', moves: ['splash', 'hypervoice']}]);
		battle.join('p2', 'Guest 2', 1, [{species: "Caterpie", level: 2, ability: 'naturalcure', item: 'focussash', moves: ['substitute', 'rest']}]);
		battle.commitDecisions();
		battle.commitDecisions();
		battle.choose('p1', 'move 2');
		battle.choose('p2', 'move 2');
		assert.strictEqual(battle.p2.active[0].item, 'focussash');
	});
});
