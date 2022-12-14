var jt = Object.defineProperty;
var Jt = (a, t, e) => t in a ? jt(a, t, {enumerable: !0, configurable: !0, writable: !0, value: e}) : a[t] = e;
var u = (a, t, e) => (Jt(a, typeof t != "symbol" ? t + "" : t, e), e);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
    new MutationObserver(s => {
        for (const n of s) if (n.type === "childList") for (const r of n.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && i(r)
    }).observe(document, {childList: !0, subtree: !0});

    function e(s) {
        const n = {};
        return s.integrity && (n.integrity = s.integrity), s.referrerpolicy && (n.referrerPolicy = s.referrerpolicy), s.crossorigin === "use-credentials" ? n.credentials = "include" : s.crossorigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function i(s) {
        if (s.ep) return;
        s.ep = !0;
        const n = e(s);
        fetch(s.href, n)
    }
})();
const o = {
    gui: document.getElementById("gui"),
    items: document.getElementById("items"),
    tiles: document.getElementById("tiles"),
    entities: document.getElementById("entities")
}, U = {}, wt = class {
    constructor(t, e) {
        u(this, "connectsToGrass", !1);
        u(this, "connectsToSand", !1);
        u(this, "connectsToLava", !1);
        u(this, "connectsToWater", !1);
        this.id = t, this.name = e, wt.names[e] = this, wt.tiles[t] = this
    }

    render(t, e, i, s) {
    }

    mayPass(t, e, i, s) {
        return !0
    }

    getLightRadius(t, e, i) {
        return 0
    }

    hurt(t, e, i, s, n, r, l) {
    }

    bumpedInto(t, e, i, s) {
    }

    tick(t, e, i) {
    }

    steppedOn(t, e, i, s) {
    }

    interact(t, e, i, s, n, r) {
        return !1
    }

    connectsToLiquid() {
        return this.connectsToWater || this.connectsToLava
    }
};
let h = wt;
u(h, "names", {}), u(h, "tiles", new Array(256)), u(h, "tickCount", 0), u(h, "random", new Math.seedrandom), u(h, "nextInt", function (t) {
    return Math.floor(wt.random.quick() * t)
});
const Zt = document.createElement("canvas"), St = Zt.getContext("2d");

function K(a, t, e, i) {
    if (U[a] === void 0 && (U[a] = {}), U[a][t] === void 0 && (U[a][t] = {}), U[a][t][e] === void 0 && (U[a][t][e] = {}), U[a][t][e][i] === void 0) {
        St.clearRect(0, 0, 8, 8), St.drawImage(o.tiles, t, e, 8, 8, 0, 0, 8, 8);
        const s = parseInt(i.substring(0, 2), 16), n = parseInt(i.substring(2, 4), 16),
            r = parseInt(i.substring(4, 6), 16), l = St.getImageData(0, 0, 8, 8), {data: d} = l, {length: f} = d;
        for (let w = 0; w < f; w += 4) {
            const T = d[w + 0], x = d[w + 1], g = d[w + 2];
            T === 255 && x === 255 && g === 255 && (d[w + 0] = s, d[w + 1] = n, d[w + 2] = r)
        }
        U[a][t][e][i] = document.createElement("canvas"), U[a][t][e][i].getContext("2d").putImageData(l, 0, 0)
    }
    return U[a][t][e][i]
}

class nt {
    constructor() {
        u(this, "random", new Math.seedrandom);
        u(this, "x", 0);
        u(this, "y", 0);
        u(this, "xr", 6);
        u(this, "yr", 6);
        u(this, "removed", !1);
        u(this, "level")
    }

    nextInt(t) {
        return Math.floor(this.random.quick() * t)
    }

    render(t) {
    }

    tick() {
    }

    remove() {
        this.removed = !0
    }

    init(t) {
        this.level = t
    }

    intersects(t, e, i, s) {
        return !(this.x + this.xr < t || this.y + this.yr < e || this.x - this.xr > i || this.y - this.yr > s)
    }

    blocks(t) {
        return !1
    }

    mobHurt(t, e, i) {
    }

    tileHurt(t, e, i, s) {
    }

    move(t, e) {
        if (t != 0 || e != 0) {
            let i = !0;
            if (t != 0 && this.move2(t, 0) && (i = !1), e != 0 && this.move2(0, e) && (i = !1), !i) {
                let s = this.x >> 4, n = this.y >> 4;
                this.level.getTile(s, n).steppedOn(this.level, s, n, this)
            }
            return !i
        }
        return !0
    }

    move2(t, e) {
        if (t != 0 && e != 0) return;
        let i = this.x - this.xr >> 4, s = this.y - this.yr >> 4, n = this.x + this.xr >> 4, r = this.y + this.yr >> 4,
            l = this.x + t - this.xr >> 4, d = this.y + e - this.yr >> 4, f = this.x + t + this.xr >> 4,
            p = this.y + e + this.yr >> 4, w = !1;
        for (let g = d; g <= p; g++) for (let k = l; k <= f; k++) if (!(k >= i && k <= n && g >= s && g <= r) && (this.level.getTile(k, g).bumpedInto(this.level, k, g, this), !this.level.getTile(k, g).mayPass(this.level, k, g, this))) return w = !0, !1;
        if (w) return !1;
        let T = this.level.getEntities(this.x - this.xr, this.y - this.yr, this.x + this.xr, this.y + this.yr),
            x = this.level.getEntities(this.x + t - this.xr, this.y + e - this.yr, this.x + t + this.xr, this.y + e + this.yr);
        for (let g = 0; g < x.length; g++) {
            let k = x[g];
            k != this && k.touchedBy(this)
        }
        for (let g = 0; g < x.length; g++) T.includes(x[g]) && (x.splice(g, 1), g--);
        for (let g = 0; g < x.length; g++) {
            let k = x[g];
            if (k != this && k.blocks(this)) return !1
        }
        return this.x += t, this.y += e, !0
    }

    touchedBy(t) {
    }

    isBlockableBy(t) {
        return !0
    }

    touchItem(t) {
    }

    canSwim() {
        return !1
    }

    interact(t, e, i) {
        return e.interact(t, this, i)
    }

    use(t, e) {
        return !1
    }

    getLightRadius() {
        return 0
    }
}

const G = class extends nt {
    static nextGaussian() {
        for (var t = 0, e = 0; t === 0;) t = G.random.quick();
        for (; e === 0;) e = G.random.quick();
        return Math.sqrt(-2 * Math.log(t)) * Math.cos(2 * Math.PI * e)
    }

    constructor(t, e, i) {
        super(), this.x = e, this.y = i, this.time = 0, this.zz = 2, this.item = t, this.xx = this.x = e, this.yy = this.y = i, this.xr = 3, this.yr = 3, this.xa = G.nextGaussian() * .3, this.ya = G.nextGaussian() * .2, this.za = G.random.quick() * .7 + 1, this.lifeTime = 60 * 10 + G.nextInt(60)
    }

    tick() {
        if (this.time++, this.time >= this.lifeTime) {
            this.remove();
            return
        }
        this.xx += this.xa, this.yy += this.ya, this.zz += this.za, this.zz < 0 && (this.zz = 0, this.za *= -.5, this.xa *= .6, this.ya *= .6), this.za -= .15;
        const t = this.x, e = this.y, i = Math.floor(this.xx), s = Math.floor(this.yy), n = i - this.x, r = s - this.y;
        this.move(n, r);
        const l = this.x - t, d = this.y - e;
        this.xx += l - n, this.yy += d - r
    }

    isBlockableBy(t) {
        return !1
    }

    render(t) {
        if (this.time >= this.lifeTime - 6 * 20 && this.time / 6 % 2 == 0) return;
        const {sheet: e, sheetX: i, sheetY: s} = this.item.getSprite();
        t.render(this.x - 4, this.y - 4, e, i, s, 0, 0)
    }

    touchedBy(t) {
        this.time > 30 && t.touchItem(this)
    }

    take(t) {
        t.score++, this.item.onTake(this), this.remove()
    }
};
let A = G;
u(A, "random", new Math.seedrandom), u(A, "nextInt", function (t) {
    return Math.floor(G.random.quick() * t)
});

class At {
    getColor() {
        return 0
    }

    getSprite() {
        return {sheet: void 0, sheetX: void 0, sheetY: void 0}
    }

    onTake(t) {
    }

    renderInventory(t, e, i) {
    }

    interact(t, e, i) {
        return !1
    }

    renderIcon(t, e, i) {
    }

    interactOn(t, e, i, s, n, r) {
        return !1
    }

    isDepleted() {
        return !1
    }

    canAttack() {
        return !1
    }

    getAttackDamageBonus(t) {
        return 0
    }

    getName() {
        return ""
    }

    matches(t) {
        return t.constructor === this.constructor
    }
}

const bt = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ012345", `6789.,!?'"-+=/\\%()<>:;`], kt = 28, Lt = {};
for (let a = kt; a < kt + bt.length; a++) for (let t = 0; t < bt[a - kt].length; t++) Lt[bt[a - kt].substring(t, t + 1)] = [8 * t, 8 * a];

class L {
    static draw(t, e, i, s, n) {
        t = t.toUpperCase();
        for (let r = 0; r < t.length; r++) t[r] !== " " && e.render(i + r * 8, s, o.gui, Lt[t[r]][0], Lt[t[r]][1], n, 0)
    }

    static renderFrame(t, e, i, s, n, r) {
        for (let l = s; l <= r; l++) for (let d = i; d <= n; d++) d == i && l == s ? t.render(d * 8, l * 8, o.gui, 0, 21 * 8, 0, 0) : d == n && l == s ? t.render(d * 8, l * 8, o.gui, 0, 21 * 8, 0, 1) : d == i && l == r ? t.render(d * 8, l * 8, o.gui, 0, 21 * 8, 0, 2) : d == n && l == r ? t.render(d * 8, l * 8, o.gui, 0, 21 * 8, 0, 3) : l == s ? t.render(d * 8, l * 8, o.gui, 1 * 8, 21 * 8, 0, 0) : l == r ? t.render(d * 8, l * 8, o.gui, 1 * 8, 21 * 8, 0, 2) : d == i ? t.render(d * 8, l * 8, o.gui, 2 * 8, 21 * 8, 0, 0) : d == n ? t.render(d * 8, l * 8, o.gui, 2 * 8, 21 * 8, 0, 1) : t.render(d * 8, l * 8, o.gui, 3 * 8, 21 * 8, 0, 1);
        L.draw(e, t, i * 8 + 8, s * 8, 0)
    }
}

class R extends At {
    constructor(t, e) {
        super(), e === void 0 ? this.count = 1 : this.count = e, this.resource = t
    }

    getColor() {
        return this.resource.color
    }

    getSprite() {
        return this.resource.sprite
    }

    renderIcon(t, e, i) {
        t.render(e, i, this.resource.sheet, this.resource.sheetX, this.resource.sheetY, 0, 0)
    }

    renderInventory(t, e, i) {
        t.render(e, i, this.resource.sheet, this.resource.sheetX, this.resource.sheetY, 0, 0), L.draw(this.resource.name, t, e + 32, i, 0);
        let s = this.count;
        s > 999 && (s = 999), L.draw("" + s, t, e + 8, i, 0)
    }

    getName() {
        return this.resource.name
    }

    onTake(t) {
    }

    interactOn(t, e, i, s, n, r) {
        return this.resource.interactOn(t, e, i, s, n, r) ? (this.count--, !0) : !1
    }

    isDepleted() {
        return this.count <= 0
    }
}

class _ {
    constructor(t, e, i, s, n) {
        this.name = t, this.sheet = e, this.sheetX = i * 8, this.sheetY = s * 8, this.color = n, this.sprite = {
            sheet: this.sheet,
            sheetX: this.sheetX,
            sheetY: this.sheetY
        }
    }

    interactOn(t, e, i, s, n, r) {
        return !1
    }
}

class Pt extends _ {
    constructor(t, e, i, s, n, r, l) {
        super(t, e, i, s, n), this.heal = r, this.staminaCost = l
    }

    interactOn(t, e, i, s, n, r) {
        return n.health < n.maxHealth && n.payStamina(this.staminaCost) ? (n.heal(this.heal), !0) : !1
    }
}

class Z extends _ {
    constructor(t, e, i, s, n, r, ...l) {
        super(t, e, i, s, n), this.sourceTiles = l, this.targetTile = r
    }

    interactOn(t, e, i, s, n, r) {
        for (let l = 0; l < this.sourceTiles.length; l++) if (this.sourceTiles[l].name === t.name) return e.setTile(i, s, this.targetTile, 0), !0;
        return !1
    }
}

class c {
}

u(c, "wood", new _("Wood", o.items, 1, 0, 0)), u(c, "stone", new _("Stone", o.items, 2, 0, 0)), u(c, "flower", new Z("Flower", o.items, 4, 0, 0, h.names.flower, h.names.grass)), u(c, "acorn", new Z("Acorn", o.items, 7, 3, 0, h.names.treeSapling, h.names.grass)), u(c, "dirt", new Z("Dirt", o.items, 0, 0, 0, h.names.dirt, h.names.hole, h.names.water, h.names.lava)), u(c, "sand", new Z("Sand", o.items, 6, 3, 0, h.names.sand, h.names.grass, h.names.dirt)), u(c, "cactus", new Z("Cactus", o.items, 8, 3, 0, h.names.cactusSapling, h.names.sand)), u(c, "seeds", new Z("Seeds", o.items, 3, 0, 0, h.names.wheat, h.names.farmland)), u(c, "wheat", new _("Wheat", o.items, 6, 0, 0)), u(c, "bread", new Pt("Bread", o.items, 7, 0, 0, 2, 5)), u(c, "apple", new Pt("Apple", o.items, 16, 0, 0, 1, 5)), u(c, "coal", new _("COAL", o.items, 2, 4, 0)), u(c, "ironOre", new _("I.ORE", o.items, 3, 4, 0)), u(c, "goldOre", new _("G.ORE", o.items, 5, 4, 0)), u(c, "ironIngot", new _("IRON", o.items, 6, 4, 0)), u(c, "goldIngot", new _("GOLD", o.items, 7, 4, 0)), u(c, "slime", new _("SLIME", o.items, 9, 4, 0)), u(c, "glass", new _("glass", o.items, 10, 4, 0)), u(c, "cloth", new _("cloth", o.items, 11, 4, 0)), u(c, "cloud", new Z("cloud", o.items, 2, 0, 0, h.names.cloud, h.names.infiniteFall)), u(c, "gem", new _("gem", o.items, 12, 4, 0)), u(c, "debug spade", new _("debug spade", o.items, 18, 0, 0));

function $t() {
    c.acorn.targetTile = h.names.treeSapling, c.acorn.sourceTiles = [h.names.grass], c.flower.targetTile = h.names.flower, c.flower.sourceTiles = [h.names.grass], c.dirt.targetTile = h.names.dirt, c.dirt.sourceTiles = [h.names.hole, h.names.water, h.names.lava], c.sand.targetTile = h.names.sand, c.sand.sourceTiles = [h.names.grass, h.names.dirt], c.cactus.targetTile = h.names.cactusSapling, c.cactus.sourceTiles = [h.names.sand], c.seeds.targetTile = h.names.wheat, c.seeds.sourceTiles = [h.names.farmland], c.cloud.targetTile = h.names.cloud, c.cloud.sourceTiles = [h.names.infiniteFall]
}

class Ot extends nt {
    constructor(t, e) {
        super(), this.time = 0, this.x = t, this.y = e
    }

    tick() {
        this.time++, this.time > 10 && this.remove()
    }

    render(t) {
        t.render(this.x - 8, this.y - 8, o.entities, 8 * 8, 24 * 8, 0, 2), t.render(this.x - 0, this.y - 8, o.entities, 8 * 8, 24 * 8, 0, 3), t.render(this.x - 8, this.y - 0, o.entities, 8 * 8, 24 * 8, 0, 0), t.render(this.x - 0, this.y - 0, o.entities, 8 * 8, 24 * 8, 0, 1)
    }
}

const $ = class extends nt {
    static nextGaussian() {
        for (var t = 0, e = 0; t === 0;) t = $.random.quick();
        for (; e === 0;) e = $.random.quick();
        return Math.sqrt(-2 * Math.log(t)) * Math.cos(2 * Math.PI * e)
    }

    constructor(t, e, i, s) {
        super(), this.time = 0, this.msg = t, this.x = e, this.y = i, this.col = s, this.xx = e, this.yy = i, this.zz = 2, this.xa = $.nextGaussian() * .3, this.ya = $.nextGaussian() * .2, this.za = $.random.quick() * .7 + 2
    }

    tick() {
        this.time++, this.time > 60 && this.remove(), this.xx += this.xa, this.yy += this.ya, this.zz += this.za, this.zz < 0 && (this.zz = 0, this.za *= -.5, this.xa *= .6, this.ya *= .6), this.za -= .15, this.x = Math.floor(this.xx), this.y = Math.floor(this.yy)
    }

    render(t) {
        L.draw(this.msg, t, this.x - this.msg.length * 4, this.y - Math.floor(this.zz), 0)
    }
};
let W = $;
u(W, "random", new Math.seedrandom);
const Yt = 5, Q = class {
    constructor(t, e, i, s) {
        this.name = t, this.sheet = e, this.sheetX = i, this.sheetY = s, this.sprite = {
            sheet: this.sheet,
            sheetX: this.sheetX,
            sheetY: this.sheetY
        }, this.sprites = [];
        for (let n = 0; n < Yt; n++) this.sprites.push({
            sheet: this.sheet,
            sheetX: this.sheetX,
            sheetY: this.sheetY + n * 8
        })
    }
};
let v = Q;
u(v, "shovel", new Q("Shvl", o.items, 0 * 8, 13 * 8)), u(v, "hoe", new Q("Hoe", o.items, 1 * 8, 13 * 8)), u(v, "sword", new Q("Swrd", o.items, 2 * 8, 13 * 8)), u(v, "pickaxe", new Q("Pick", o.items, 3 * 8, 13 * 8)), u(v, "axe", new Q("Axe", o.items, 4 * 8, 13 * 8));
const q = class extends At {
    constructor(t, e) {
        super(), this.toolType = t, this.level = e
    }

    getColor() {
        return q.LEVEL_COLORS[this.level]
    }

    getSprite() {
        return this.toolType.sprites[this.level]
    }

    renderIcon(t, e, i) {
        const s = this.toolType.sprites[this.level];
        t.render(e, i, s.sheet, s.sheetX, s.sheetY, this.getColor(), 0)
    }

    renderInventory(t, e, i) {
        const s = this.toolType.sprites[this.level];
        t.render(e, i, s.sheet, s.sheetX, s.sheetY, this.getColor(), 0), L.draw(this.getName(), t, e + 8, i, 0)
    }

    getName() {
        return q.LEVEL_NAMES[this.level] + " " + this.toolType.name
    }

    onTake(t) {
    }

    canAttack() {
        return !0
    }

    getAttackDamageBonus(t) {
        return this.toolType === v.axe ? (this.level + 1) * 2 + q.nextInt(4) : this.toolType === v.sword ? (this.level + 1) * 3 + q.nextInt(2 + this.level * this.level * 2) : 1
    }

    matches(t) {
        return t instanceof q ? !(t.toolType !== this.toolType || t.level !== this.level) : !1
    }
};
let S = q;
u(S, "random", new Math.seedrandom), u(S, "nextInt", function (t) {
    return Math.floor(q.random.quick() * t)
}), u(S, "MAX_LEVEL", Yt), u(S, "LEVEL_NAMES", ["Wood", "Rock", "Iron", "Gold", "Gem"]), u(S, "LEVEL_COLORS", [0, 0, 0, 0, 0]);

class Tt extends nt {
    constructor() {
        super();
        u(this, "walkDist", 0);
        u(this, "dir", 0);
        u(this, "hurtTime", 0);
        u(this, "xKnockback", 0);
        u(this, "yKnockback", 0);
        u(this, "maxHealth", 10);
        u(this, "health", this.maxHealth);
        u(this, "swimTimer", 0);
        u(this, "tickTime", 0);
        this.x = 8, this.y = 8, this.xr = 4, this.yr = 3
    }

    tick() {
        this.tickTime++, this.level.getTile(this.x >> 4, this.y >> 4) == h.lava && this.hurt(this, 4, this.dir ^ 1), this.health <= 0 && this.die(), this.hurtTime > 0 && this.hurtTime--
    }

    die() {
        this.remove()
    }

    move(e, i) {
        return this.isSwimming() && this.swimTimer++ % 2 == 0 || (this.xKnockback < 0 && (this.move2(-1, 0), this.xKnockback++), this.xKnockback > 0 && (this.move2(1, 0), this.xKnockback--), this.yKnockback < 0 && (this.move2(0, -1), this.yKnockback++), this.yKnockback > 0 && (this.move2(0, 1), this.yKnockback--), this.hurtTime > 0) ? !0 : ((e != 0 || i != 0) && (this.walkDist++, e < 0 && (this.dir = 2), e > 0 && (this.dir = 3), i < 0 && (this.dir = 1), i > 0 && (this.dir = 0)), super.move(e, i))
    }

    isSwimming() {
        let e = this.level.getTile(this.x >> 4, this.y >> 4).name;
        return e == h.names.water.name || e == h.names.lava.name
    }

    blocks(e) {
        return e.isBlockableBy(this)
    }

    tileHurt(e, i, s, n) {
        let r = this.dir ^ 1;
        this.doHurt(n, r)
    }

    mobHurt(e, i, s) {
        this.doHurt(i, s)
    }

    heal(e) {
        this.hurtTime > 0 || (this.level.add(new W("" + e, this.x, this.y, 0)), this.health += e, this.health > this.maxHealth && (this.health = this.maxHealth))
    }

    doHurt(e, i) {
        this.hurtTime > 0 || (this.level.player != null && (this.level.player.x - this.x, this.level.player.y - this.y), this.level.add(new W("" + e, this.x, this.y, 0)), this.health -= e, i == 0 && (this.yKnockback = 6), i == 1 && (this.yKnockback = -6), i == 2 && (this.xKnockback = -6), i == 3 && (this.xKnockback = 6), this.hurtTime = 10)
    }

    findStartPos(e) {
        let i = this.nextInt(e.w), s = this.nextInt(e.h), n = i * 16 + 8, r = s * 16 + 8;
        if (e.player != null) {
            let d = e.player.x - n, f = e.player.y - r;
            if (d * d + f * f < 80 * 80) return !1
        }
        let l = e.monsterDensity * 16;
        return e.getEntities(n - l, r - l, n + l, r + l).length > 0 ? !1 : e.getTile(i, s).mayPass(e, i, s, this) ? (this.x = n, this.y = r, !0) : !1
    }
}

const mt = document.getElementById("canvas"), y = {}, Et = ["HOTBAR_1", "HOTBAR_2", "HOTBAR_3", "HOTBAR_4", "HOTBAR_5"],
    m = {
        MOVE_UP: ["w", "ArrowUp"],
        MOVE_DOWN: ["s", "ArrowDown"],
        MOVE_RIGHT: ["d", "ArrowRight"],
        MOVE_LEFT: ["a", "ArrowLeft"],
        ATTACK: ["c", "enter"],
        MENU: ["x", "e"],
        HOTBAR_1: ["1"],
        HOTBAR_2: ["2"],
        HOTBAR_3: ["3"],
        HOTBAR_4: ["4"],
        HOTBAR_5: ["5"],
        DEBUG_1: ["i"],
        DEBUG_2: ["o"],
        DEBUG_3: ["p"],
        isPressed: function (a, t) {
            t === void 0 && (t = y);
            for (let e = 0; e < m[a].length; e++) {
                const i = t[m[a][e]];
                if (i !== void 0 && i[1] > 0) return !0
            }
            return !1
        },
        isClicked: function (a, t) {
            t === void 0 && (t = y);
            for (let e = 0; e < m[a].length; e++) {
                const i = t[m[a][e]];
                if (i !== void 0 && i[0] === !0) return i[0] = !1, !0
            }
            return !1
        }
    };

function b(a) {
    y[a] === void 0 ? y[a] = [!0, 1] : (y[a][1] += 1, y[a][1] === 1 && (y[a][0] = !0))
}

function Qt(a) {
    switch (a.cardinalDirection) {
        case"N":
            b(m.MOVE_UP[0]), y[m.MOVE_DOWN[0]] = [!1, 0], y[m.MOVE_LEFT[0]] = [!1, 0], y[m.MOVE_RIGHT[0]] = [!1, 0];
            break;
        case"NE":
            b(m.MOVE_UP[0]), b(m.MOVE_RIGHT[0]), y[m.MOVE_DOWN[0]] = [!1, 0], y[m.MOVE_LEFT[0]] = [!1, 0];
            break;
        case"E":
            b(m.MOVE_RIGHT[0]), y[m.MOVE_LEFT[0]] = [!1, 0], y[m.MOVE_UP[0]] = [!1, 0], y[m.MOVE_DOWN[0]] = [!1, 0];
            break;
        case"SE":
            b(m.MOVE_DOWN[0]), b(m.MOVE_RIGHT[0]), y[m.MOVE_LEFT[0]] = [!1, 0], y[m.MOVE_UP[0]] = [!1, 0];
            break;
        case"S":
            b(m.MOVE_DOWN[0]), y[m.MOVE_UP[0]] = [!1, 0], y[m.MOVE_LEFT[0]] = [!1, 0], y[m.MOVE_RIGHT[0]] = [!1, 0];
            break;
        case"SW":
            b(m.MOVE_DOWN[0]), b(m.MOVE_LEFT[0]), y[m.MOVE_RIGHT[0]] = [!1, 0], y[m.MOVE_UP[0]] = [!1, 0];
            break;
        case"W":
            b(m.MOVE_LEFT[0]), y[m.MOVE_RIGHT[0]] = [!1, 0], y[m.MOVE_UP[0]] = [!1, 0], y[m.MOVE_DOWN[0]] = [!1, 0];
            break;
        case"NW":
            b(m.MOVE_LEFT[0]), b(m.MOVE_UP[0]), y[m.MOVE_RIGHT[0]] = [!1, 0], y[m.MOVE_DOWN[0]] = [!1, 0];
            break;
        case"C":
            y[m.MOVE_UP[0]] = [!1, 0], y[m.MOVE_DOWN[0]] = [!1, 0], y[m.MOVE_LEFT[0]] = [!1, 0], y[m.MOVE_RIGHT[0]] = [!1, 0];
            break
    }
}

te();

async function te() {
    {
        const a = document.getElementById("joyDiv");
        for (a.style.display = "block"; a.clientWidth === 0;) await new Promise(s => setTimeout(s, 100));
        new JoyStick("joyDiv", {}, Qt);
        const t = document.getElementById("virtualButtonsContainer");
        t.style.display = "block";
        const e = document.getElementById("virtualMenuButton"), i = document.getElementById("virtualActionButton");
        i.addEventListener("touchstart", s => {
            b(m.ATTACK[0])
        }), i.addEventListener("touchend", s => {
            y[m.ATTACK[0]] = [!1, 0]
        }), i.addEventListener("touchcancel", s => {
            y[m.ATTACK[0]] = [!1, 0]
        }), e.addEventListener("touchstart", s => {
            b(m.MENU[0])
        }), e.addEventListener("touchend", s => {
            y[m.MENU[0]] = [!1, 0]
        }), e.addEventListener("touchcancel", s => {
            y[m.MENU[0]] = [!1, 0]
        }), mt.addEventListener("touchstart", s => {
            const n = s.touches[0], r = (n.clientX - n.target.offsetLeft) / n.target.clientWidth,
                l = (n.clientY - n.target.offsetTop) / n.target.clientHeight;
            r < .515 || l < .877 || (r < .605 ? b(m.HOTBAR_1[0]) : r < .701 ? b(m.HOTBAR_2[0]) : r < .795 ? b(m.HOTBAR_3[0]) : r < .887 ? b(m.HOTBAR_4[0]) : r < .98 && b(m.HOTBAR_5[0]))
        }), mt.addEventListener("touchend", s => {
            y[m.HOTBAR_1[0]] = [!1, 0], y[m.HOTBAR_2[0]] = [!1, 0], y[m.HOTBAR_3[0]] = [!1, 0], y[m.HOTBAR_4[0]] = [!1, 0], y[m.HOTBAR_5[0]] = [!1, 0]
        }), mt.addEventListener("touchcancel", s => {
            y[m.HOTBAR_1[0]] = [!1, 0], y[m.HOTBAR_2[0]] = [!1, 0], y[m.HOTBAR_3[0]] = [!1, 0], y[m.HOTBAR_4[0]] = [!1, 0], y[m.HOTBAR_5[0]] = [!1, 0]
        })
    }
}

mt.addEventListener("keydown", function (a) {
    y[a.key] === void 0 ? y[a.key] = [!0, 1] : (y[a.key][1] += 1, y[a.key][1] === 1 && (y[a.key][0] = !0))
});
mt.addEventListener("keyup", function (a) {
    y[a.key] = [!1, 0]
});

class Ft {
    constructor() {
        this.items = []
    }

    add(t, e) {
        if (e === void 0 && (e = this.items.length), t instanceof R) {
            const i = t, s = this.findResource(i.resource);
            s === void 0 ? this.items.splice(e, 0, i) : s.count += i.count
        } else this.items.splice(e, 0, t)
    }

    findResource(t) {
        for (let e = 0; e < this.items.length; e++) if (this.items[e] instanceof R) {
            const i = this.items[e];
            if (i.resource === t) return i
        }
    }

    hasResource(t, e) {
        const i = this.findResource(t);
        return i === void 0 ? !1 : i.count >= e
    }

    removeResource(t, e) {
        const i = this.findResource(t);
        return i === void 0 || i.count < e ? !1 : (i.count -= e, i.count <= 0 && this.items.splice(this.items.indexOf(i), 1), !0)
    }

    removeItem(t) {
        this.items.splice(this.items.indexOf(t), 1)
    }

    count(t) {
        if (t instanceof R) {
            const e = this.findResource(t.resource);
            if (e !== void 0) return e.count
        } else {
            let e = 0;
            for (let i = 0; i < this.items.length; i++) this.items[i].matches(t) && e++;
            return e
        }
        return 0
    }
}

class j extends Tt {
    constructor(t) {
        super(), this.game = t, this.x = 24, this.y = 24, this.maxStamina = 10, this.stamina = this.maxStamina, this.staminaRechargeDelay = 0, this.staminaRecharge = 0, this.invulnerableTime = 0, this.onStairsDelay = 0, this.attackTime = 0, this.attackDir = 0, this.attackItem = void 0, this.activeItem = void 0, this.hotbarItems = [void 0, void 0, void 0, void 0, void 0], this.activeItemIndex = 0, this.score = 0, this.onStairsDelay = 0, this.inventory = new Ft
    }

    tick() {
        super.tick(), this.invulnerableTime > 0 && this.invulnerableTime--;
        const t = this.level.getTile(this.x >> 4, this.y >> 4);
        if (this.onStairsDelay <= 0 && (t == h.names.stairsDown || t == h.names.stairsUp) ? (this.changeLevel(t == h.names.stairsUp ? 1 : -1), this.onStairsDelay = 60) : this.onStairsDelay > 0 && this.onStairsDelay--, this.stamina <= 0 && this.staminaRechargeDelay == 0 && this.staminaRecharge == 0 && (this.staminaRechargeDelay = 40), this.staminaRechargeDelay > 0 && this.staminaRechargeDelay--, this.staminaRechargeDelay == 0) for (this.staminaRecharge++, this.isSwimming() && (this.staminaRecharge = 0); this.staminaRecharge > 10;) this.staminaRecharge -= 10, this.stamina < this.maxStamina && this.stamina++;
        for (let s = 0; s < Et.length; s++) m.isClicked(Et[s]) && this.setActiveItemIndex(s);
        let e = 0, i = 0;
        m.isPressed("MOVE_LEFT", y) && e--, m.isPressed("MOVE_RIGHT", y) && e++, m.isPressed("MOVE_UP", y) && i--, m.isPressed("MOVE_DOWN", y) && i++, this.isSwimming() && this.tickTime % 60 == 0 && (this.stamina > 0 ? this.stamina-- : this.mobHurt(this, 1, this.dir ^ 1)), this.staminaRechargeDelay % 2 == 0 && this.move(e, i), m.isClicked("ATTACK", y) && this.stamina > 0 && (this.stamina--, this.staminaRecharge = 0, this.attack()), m.isClicked("MENU", y) && (this.use() || this.game.showInventoryMenu()), this.attackTime > 0 && this.attackTime--
    }

    attack() {
        this.walkDist += 8, this.attackDir = this.dir, this.attackItem = this.activeItem;
        let t = !1;
        if (this.activeItem !== void 0) {
            this.attackTime = 10;
            let e = -2, i = 12;
            if (this.dir == 0 && this.interact(this.x - 8, this.y + 4 + e, this.x + 8, this.y + i + e) && (t = !0), this.dir == 1 && this.interact(this.x - 8, this.y - i + e, this.x + 8, this.y - 4 + e) && (t = !0), this.dir == 3 && this.interact(this.x + 4, this.y - 8 + e, this.x + i, this.y + 8 + e) && (t = !0), this.dir == 2 && this.interact(this.x - i, this.y - 8 + e, this.x - 4, this.y + 8 + e) && (t = !0), t) return;
            let s = this.x >> 4, n = this.y + e >> 4, r = 12;
            this.attackDir == 0 && (n = this.y + r + e >> 4), this.attackDir == 1 && (n = this.y - r + e >> 4), this.attackDir == 2 && (s = this.x - r >> 4), this.attackDir == 3 && (s = this.x + r >> 4), s >= 0 && n >= 0 && s < this.level.w && n < this.level.h && ((this.activeItem.interactOn(this.level.getTile(s, n), this.level, s, n, this, this.attackDir) || this.level.getTile(s, n).interact(this.level, s, n, this, this.activeItem, this.attackDir)) && (t = !0), this.activeItem.isDepleted() && this.removeDepletedItem())
        }
        if (!t && (this.activeItem == null || this.activeItem.canAttack())) {
            this.attackTime = 5;
            let e = -2, i = 20;
            this.dir == 0 && this.doHurtEntities(this.x - 8, this.y + 4 + e, this.x + 8, this.y + i + e), this.dir == 1 && this.doHurtEntities(this.x - 8, this.y - i + e, this.x + 8, this.y - 4 + e), this.dir == 3 && this.doHurtEntities(this.x + 4, this.y - 8 + e, this.x + i, this.y + 8 + e), this.dir == 2 && this.doHurtEntities(this.x - i, this.y - 8 + e, this.x - 4, this.y + 8 + e);
            let s = this.x >> 4, n = this.y + e >> 4, r = 12;
            this.attackDir == 0 && (n = this.y + r + e >> 4), this.attackDir == 1 && (n = this.y - r + e >> 4), this.attackDir == 2 && (s = this.x - r >> 4), this.attackDir == 3 && (s = this.x + r >> 4), s >= 0 && n >= 0 && s < this.level.w && n < this.level.h && this.level.getTile(s, n).hurt(this.level, s, n, this, h.nextInt(3) + 1, this.attackDir)
        }
    }

    doHurtEntities(t, e, i, s) {
        const n = this.level.getEntities(t, e, i, s);
        for (let r = 0; r < n.length; r++) {
            const l = n[r];
            l != this && l.mobHurt(this, this.getAttackDamage(l), this.attackDir)
        }
    }

    getAttackDamage(t) {
        let e = this.nextInt(3) + 1;
        return this.attackItem != null && (e += this.attackItem.getAttackDamageBonus(t)), e
    }

    use() {
        return !!(this.dir == 0 && this.useRect(this.x - 8, this.y + 4 - 2, this.x + 8, this.y + 12 - 2) || this.dir == 1 && this.useRect(this.x - 8, this.y - 12 - 2, this.x + 8, this.y - 4 - 2) || this.dir == 2 && this.useRect(this.x - 12, this.y - 8 - 2, this.x - 4, this.y + 8 - 2) || this.dir == 3 && this.useRect(this.x + 4, this.y - 8 - 2, this.x + 12, this.y + 8 - 2))
    }

    interact(t, e, i, s) {
        const n = this.level.getEntities(t, e, i, s);
        for (let r = 0; r < n.length; r++) {
            const l = n[r];
            if (l != this && l.interact(this, this.activeItem, this.attackDir)) return !0
        }
        return !1
    }

    useRect(t, e, i, s) {
        const n = this.level.getEntities(t, e, i, s);
        for (let r = 0; r < n.length; r++) {
            const l = n[r];
            if (l != this && l.use(this, this.attackDir)) return !0
        }
        return !1
    }

    removeDepletedItem() {
        this.inventory.removeItem(this.activeItem);
        for (let t = 0; t < this.hotbarItems.length; t++) this.hotbarItems[t] === this.activeItem && (this.hotbarItems[t] = void 0);
        this.hotbarItems[this.activeItemIndex] = void 0, this.activeItem = void 0
    }

    setHotbarItem(t, e) {
        this.hotbarItems[t] = e, this.activeItemIndex === t && (this.activeItem = this.hotbarItems[t])
    }

    setActiveItemIndex(t) {
        this.activeItemIndex = t, this.activeItem = this.hotbarItems[t]
    }

    payStamina(t) {
        return t > this.stamina ? !1 : (this.stamina -= t, !0)
    }

    render(t) {
        let e = 0, i = this.walkDist >> 3 & 1, s = this.walkDist >> 3 & 1;
        this.dir == 1 ? e += 2 : this.dir > 1 && (i = 0, s = this.walkDist >> 4 & 1, this.dir == 2 && (i = 1), e += 4 + (this.walkDist >> 3 & 1) * 2);
        const n = this.x - 8;
        let r = this.y - 11;
        const l = this.isSwimming();
        l && (r += 4, t.render(n + 0, r + 3, o.gui, 5 * 8, 2 * 8, 0, 0), t.render(n + 8, r + 3, o.gui, 5 * 8, 2 * 8, 0, 1)), t.render(n + 8 * i, r, o.entities, e * 8, 16 * 8, 0, i), t.render(n + 8 - 8 * i, r, o.entities, (e + 1) * 8, 16 * 8, 0, i), l || (t.render(n + 8 * s, r + 8, o.entities, e * 8, 17 * 8, 0, s), t.render(n + 8 - 8 * s, r + 8, o.entities, (e + 1) * 8, 17 * 8, 0, s))
    }

    getLightRadius() {
        let t = 2;
        if (this.activeItem !== void 0 && this.activeItem.furniture !== void 0 && typeof this.activeItem.furniture.getLightRadius == "function") {
            const e = this.activeItem.furniture.getLightRadius();
            e > t && (t = e)
        }
        return t
    }

    changeLevel(t) {
        this.game.scheduleLevelChange(t)
    }

    touchItem(t) {
        t.take(this), this.inventory.add(t.item)
    }

    touchedBy(t) {
        t instanceof j || t.touchedBy(this)
    }

    canSwim() {
        return !0
    }

    findStartPos(t) {
        for (; ;) {
            const e = this.nextInt(t.w), i = this.nextInt(t.h);
            if (t.getTile(e, i) == h.names.grass) return this.x = e * 16 + 8, this.y = i * 16 + 8, !0
        }
    }
}

const yt = class extends nt {
    constructor(t, e, i) {
        super(), this.xa = e, this.ya = i, this.x = t.x, this.y = t.y, this.xx = this.x, this.yy = this.y, this.yr = 0, this.xr = 0, this.time = 0, this.owner = t, this.lifeTime = 60 * 10 + yt.nextInt(30)
    }

    tick() {
        if (this.time++, this.time > this.lifeTime) {
            this.remove();
            return
        }
        this.xx += this.xa, this.yy += this.ya, this.x = Math.floor(this.xx), this.y = Math.floor(this.yy);
        const t = this.level.getEntities(this.x, this.y, this.x, this.y);
        for (let e = 0; e < t.length; e++) {
            const i = t[e];
            i instanceof Tt && i !== this.owner && i.mobHurt(this.owner, 1, i.dir ^ 1)
        }
    }

    isBlockableBy(t) {
        return !1
    }

    render(t) {
        this.time >= this.lifeTime - 6 * 20 && this.time / 6 % 2 == 0 || t.render(this.x - 4, this.y - 4 - 2, o.entities, 8 * 8, 24 * 8, 0, yt.nextInt(4))
    }
};
let dt = yt;
u(dt, "random", new Math.seedrandom), u(dt, "nextInt", function (t) {
    return Math.floor(yt.random.quick() * t)
});
const Y = class extends Tt {
    constructor() {
        super(), this.xa = 0, this.ya = 0, this.randomWalkTime = 0, this.attackDelay = 0, this.attackTime = 0, this.attackType = 0, this.x = Y.nextInt(64 * 16), this.y = Y.nextInt(64 * 16), this.maxHealth = 2e3, this.health = this.maxHealth
    }

    tick() {
        if (super.tick(), this.attackDelay > 0) {
            this.dir = (this.attackDelay - 45) / 4 % 4, this.dir = this.dir * 2 % 4 + this.dir / 2, this.attackDelay < 45 && (this.dir = 0), this.attackDelay--, this.attackDelay == 0 && (this.attackType = 0, this.health < 1e3 && (this.attackType = 1), this.health < 200 && (this.attackType = 2), this.attackTime = 60 * 2);
            return
        }
        if (this.attackTime > 0) {
            this.attackTime--;
            const e = this.attackTime * .25 * (this.attackTime % 2 * 2 - 1), i = .7 + this.attackType * .2;
            this.level.add(new dt(this, Math.cos(e) * i, Math.sin(e) * i));
            return
        }
        if (this.level.player !== void 0 && this.randomWalkTime === 0) {
            const e = this.level.player.x - this.x, i = this.level.player.y - this.y;
            e * e + i * i < 32 * 32 ? (this.xa = 0, this.ya = 0, e < 0 && (this.xa = 1), e > 0 && (this.xa = -1), i < 0 && (this.ya = 1), i > 0 && (this.ya = -1)) : e * e + i * i > 80 * 80 && (this.xa = 0, this.ya = 0, e < 0 && (this.xa = -1), e > 0 && (this.xa = 1), i < 0 && (this.ya = -1), i > 0 && (this.ya = 1))
        }
        const t = this.tickTime % 4 == 0 ? 0 : 1;
        if ((!this.move(this.xa * t, this.ya * t) || Y.nextInt(100) === 0) && (this.randomWalkTime = 30, this.xa = Y.nextInt(3) - 1, this.ya = Y.nextInt(3) - 1), this.randomWalkTime > 0 && (this.randomWalkTime--, this.level.player !== void 0 && this.randomWalkTime === 0)) {
            const e = this.level.player.x - this.x, i = this.level.player.y - this.y;
            Y.nextInt(4) === 0 && e * e + i * i < 50 * 50 && this.attackDelay === 0 && this.attackTime === 0 && (this.attackDelay = 60)
        }
    }

    render(t) {
        let e = 8;
        const i = 16;
        let s = this.walkDist >> 3 & 1, n = this.walkDist >> 3 & 1;
        this.dir == 1 && (e += 2), this.dir > 1 && (s = 0, n = this.walkDist >> 4 & 1, this.dir == 2 && (s = 1), e += 4 + (this.walkDist >> 3 & 1) * 2);
        const r = this.x - 8, l = this.y - 11;
        t.render(r + 8 * s, l + 0, o.entities, 8 * e, 8 * i, 0, s), t.render(r + 8 - 8 * s, l + 0, o.entities, 8 * (e + 1), 8 * i, 0, s), t.render(r + 8 * n, l + 8, o.entities, 8 * e, 8 * (i + 1), 0, n), t.render(r + 8 - 8 * n, l + 8, o.entities, 8 * (e + 1), 8 * (i + 1), 0, n)
    }

    touchedBy(t) {
        t instanceof j && t.mobHurt(this, 3, this.dir)
    }

    die() {
        super.die()
    }
};
let X = Y;
u(X, "random", new Math.seedrandom), u(X, "nextInt", function (t) {
    return Math.floor(Y.random.quick() * t)
});

class Xt extends h {
    constructor() {
        super(...arguments);
        u(this, "connectsToGrass", !0)
    }

    render(e, i, s, n) {
        let r = !i.getTile(s, n - 1).connectsToGrass, l = !i.getTile(s, n + 1).connectsToGrass,
            d = !i.getTile(s - 1, n).connectsToGrass, f = !i.getTile(s + 1, n).connectsToGrass;
        !r && !d ? e.render(16 * s, 16 * n, o.tiles, 3 * 8, 6 * 8, 0, 0) : e.render(16 * s, 16 * n, K(this.id, (d ? 0 : 1) * 8, (r ? 6 : 7) * 8, "816953"), 0, 0, 0, 0), !r && !f ? e.render(16 * s + 8, 16 * n, o.tiles, 4 * 8, 6 * 8, 0, 0) : e.render(16 * s + 8, 16 * n, K(this.id, (f ? 2 : 1) * 8, (r ? 6 : 7) * 8, "816953"), 0, 0, 0, 0), !l && !d ? e.render(16 * s, 16 * n + 8, o.tiles, 3 * 8, 7 * 8, 0, 0) : e.render(16 * s, 16 * n + 8, K(this.id, (d ? 0 : 1) * 8, (l ? 8 : 7) * 8, "816953"), 0, 0, 0, 0), !l && !f ? e.render(16 * s + 8, 16 * n + 8, o.tiles, 4 * 8, 7 * 8, 0, 0) : e.render(16 * s + 8, 16 * n + 8, K(this.id, (f ? 2 : 1) * 8, (l ? 8 : 7) * 8, "816953"), 0, 0, 0, 0)
    }

    tick(e, i, s) {
        let n = i, r = s;
        h.nextInt(10) === 0 && (h.nextInt(2) === 1 ? n += h.nextInt(2) * 2 - 1 : r += h.nextInt(2) * 2 - 1, e.getTile(n, r).name == h.names.dirt.name && e.setTile(n, r, h.names.grass, 0))
    }

    interact(e, i, s, n, r, l) {
        return r instanceof S ? r.toolType === v.shovel ? n.payStamina(4 - r.level) ? (h.nextInt(5) === 0 && e.add(new A(new R(c.seeds), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3)), e.setTile(i, s, h.names.dirt, 0), !0) : !1 : r.toolType === v.hoe ? n.payStamina(4 - r.level) ? (h.nextInt(5) === 0 && e.add(new A(new R(c.seeds), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3)), e.setTile(i, s, h.names.farmland, 0), !0) : !1 : !0 : !1
    }
}

class Wt extends h {
    render(t, e, i, s) {
        let n = e.getTile(i, s - 1).id != this.id, r = e.getTile(i, s + 1).id != this.id,
            l = e.getTile(i - 1, s).id != this.id, d = e.getTile(i + 1, s).id != this.id;
        !n && !l ? t.render(16 * i, 16 * s, o.tiles, 21 * 8, 6 * 8, 0, 0) : t.render(16 * i, 16 * s, o.tiles, (l ? 18 : 19) * 8, (n ? 6 : 7) * 8, 0, 0), !n && !d ? t.render(16 * i + 8, 16 * s, o.tiles, 22 * 8, 6 * 8, 0, 0) : t.render(16 * i + 8, 16 * s, o.tiles, (d ? 20 : 19) * 8, (n ? 6 : 7) * 8, 0, 0), !r && !l ? t.render(16 * i, 16 * s + 8, o.tiles, 21 * 8, 7 * 8, 0, 0) : t.render(16 * i, 16 * s + 8, o.tiles, (l ? 18 : 19) * 8, (r ? 8 : 7) * 8, 0, 0), !r && !d ? t.render(16 * i + 8, 16 * s + 8, o.tiles, 22 * 8, 7 * 8, 0, 0) : t.render(16 * i + 8, 16 * s + 8, o.tiles, (d ? 20 : 19) * 8, (r ? 8 : 7) * 8, 0, 0)
    }

    mayPass(t, e, i, s) {
        return !1
    }

    hurt(t, e, i, s, n, r) {
        const l = t.getData(e, i) + n;
        if (t.add(new Ot(e * 16 + 8, i * 16 + 8)), t.add(new W("" + n, e * 16 + 8, i * 16 + 8, 0)), l >= 50) {
            let d = h.nextInt(4) + 1;
            for (let f = 0; f < d; f++) t.add(new A(new R(c.stone), e * 16 + h.nextInt(10) + 3, i * 16 + h.nextInt(10) + 3));
            d = h.nextInt(2);
            for (let f = 0; f < d; f++) t.add(new A(new R(c.coal), e * 16 + h.nextInt(10) + 3, i * 16 + h.nextInt(10) + 3));
            t.setTile(e, i, h.names.dirt, 0)
        } else t.setData(e, i, l)
    }

    interact(t, e, i, s, n, r) {
        return !(n instanceof S) || n.toolType !== v.pickaxe || !s.payStamina(4 - n.level) ? !1 : (this.hurt(t, e, i, s, h.nextInt(10) + n.level * 5 + 10, r), !0)
    }

    tick(t, e, i) {
        const s = t.getData(e, i);
        s > 0 && t.setData(e, i, s - 1)
    }
}

const Ct = class extends h {
    render(t, e, i, s) {
        const n = Ct.flips[h.tickCount % Ct.flips.length];
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 2 * 8, 0, 0, n), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 3 * 8, 0, 0, n), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 4 * 8, 0, 0, n), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 5 * 8, 0, 0, n)
    }

    mayPass(t, e, i, s) {
        return s.canSwim()
    }
};
let pt = Ct;
u(pt, "flips", []);
for (let a = 0; a <= 3; a++) for (let t = 0; t < 25; t++) pt.flips.push(a);

class ee extends Xt {
    constructor() {
        super(...arguments);
        u(this, "connectsToGrass", !0)
    }

    render(e, i, s, n) {
        super.render(e, i, s, n), i.getData(s, n) / 16 % 2 == 0 ? (e.render(s * 16 + 0, n * 16 + 0, o.tiles, 3 * 8, 8 * 8, 0, 0), e.render(s * 16 + 8, n * 16 + 8, o.tiles, 3 * 8, 8 * 8, 0, 0)) : (e.render(s * 16 + 8, n * 16 + 0, o.tiles, 3 * 8, 8 * 8, 0, 0), e.render(s * 16 + 0, n * 16 + 8, o.tiles, 3 * 8, 8 * 8, 0, 0))
    }

    interact(e, i, s, n, r, l) {
    }

    hurt(e, i, s, n, r, l) {
        const d = h.nextInt(2) + 1;
        for (let f = 0; f < d; f++) e.add(new A(new R(c.flower), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3));
        e.setTile(i, s, h.names.grass, 0)
    }
}

class ie extends h {
    constructor() {
        super(...arguments);
        u(this, "connectsToGrass", !0)
    }

    render(e, i, s, n) {
        h.tiles[0].render(e, i, s, n);
        let r = i.getTile(s, n - 1) == this, l = i.getTile(s - 1, n) == this, d = i.getTile(s + 1, n) == this,
            f = i.getTile(s, n + 1) == this, p = i.getTile(s - 1, n - 1) == this, w = i.getTile(s + 1, n - 1) == this,
            T = i.getTile(s - 1, n + 1) == this, x = i.getTile(s + 1, n + 1) == this;
        r && p && l ? e.render(16 * s, 16 * n, o.tiles, 8, 8, 0, 0) : e.render(16 * s, 16 * n, o.tiles, 0, 0, 0, 0), r && w && d ? e.render(16 * s + 8, 16 * n, o.tiles, 8, 16, 0, 0) : e.render(16 * s + 8, 16 * n, o.tiles, 8, 0, 0, 0), f && T && l ? e.render(16 * s, 16 * n + 8, o.tiles, 8, 16, 0, 0) : e.render(16 * s, 16 * n + 8, o.tiles, 0, 8, 0, 0), f && x && d ? e.render(16 * s + 8, 16 * n + 8, o.tiles, 8, 8, 0, 0) : e.render(16 * s + 8, 16 * n + 8, o.tiles, 8, 24, 0, 0)
    }

    tick(e, i, s) {
        let n = e.getData(i, s);
        n > 0 && e.setData(i, s, n - 1)
    }

    mayPass(e, i, s, n) {
        return !1
    }

    hurt(e, i, s, n, r, l) {
        this.internalHurt(e, i, s, r)
    }

    interact(e, i, s, n, r, l) {
        return !(r instanceof S) || r.toolType !== v.axe || !n.payStamina(4 - r.level) ? !1 : (this.internalHurt(e, i, s, h.nextInt(10) + r.level * 5 + 10), !0)
    }

    internalHurt(e, i, s, n) {
        let r = h.nextInt(10) == 0 ? 1 : 0;
        for (let d = 0; d < r; d++) e.add(new A(new R(c.apple), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3));
        let l = e.getData(i, s) + n;
        if (e.add(new Ot(i * 16 + 8, s * 16 + 8)), e.add(new W("" + n, i * 16 + 8, s * 16 + 8, 0)), l >= 20) {
            let d = h.nextInt(2) + 1;
            for (let f = 0; f < d; f++) e.add(new A(new R(c.wood), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3));
            d = h.nextInt(h.nextInt(4) + 1);
            for (let f = 0; f < d; f++) e.add(new A(new R(c.acorn), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3));
            e.setTile(i, s, h.names.grass, 0)
        } else e.setData(i, s, l)
    }
}

class se extends h {
    render(t, e, i, s) {
        t.render(i * 16, s * 16, o.tiles, 14 * 8, 4 * 8, 0, 0), t.render(i * 16 + 8, s * 16, o.tiles, 15 * 8, 4 * 8, 0, 0), t.render(i * 16, s * 16 + 8, o.tiles, 14 * 8, 5 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 15 * 8, 5 * 8, 0, 0)
    }

    interact(t, e, i, s, n, r) {
        if (!(n instanceof S)) return !1;
        if (n.toolType === v.shovel) return s.payStamina(4 - n.level) ? (t.add(new A(new R(c.dirt), e * 16 + h.nextInt(10) + 3, i * 16 + h.nextInt(10) + 3)), t.setTile(e, i, h.names.hole, 0), !0) : !1;
        if (n.toolType === v.hoe) return s.payStamina(4 - n.level) ? (t.setTile(e, i, h.names.farmland, 0), !0) : !1
    }
}

class ne extends h {
    constructor() {
        super(...arguments);
        u(this, "connectsToSand", !0)
    }

    render(e, i, s, n) {
        let r = !i.getTile(s, n - 1).connectsToSand, l = !i.getTile(s, n + 1).connectsToSand,
            d = !i.getTile(s - 1, n).connectsToSand, f = !i.getTile(s + 1, n).connectsToSand, p = i.getData(s, n) > 0;
        !r && !d ? p || e.render(s * 16 + 0, n * 16 + 0, o.tiles, 9 * 8, 6 * 8, 0, 0) : e.render(s * 16 + 0, n * 16 + 0, o.tiles, (d ? 6 : 7) * 8, (r ? 6 : 7) * 8, 0, 0), !r && !f ? e.render(s * 16 + 8, n * 16 + 0, o.tiles, 10 * 8, 6 * 8, 0, 0) : e.render(s * 16 + 8, n * 16 + 0, o.tiles, (f ? 8 : 7) * 8, (r ? 6 : 7) * 8, 0, 0), !l && !d ? e.render(s * 16 + 0, n * 16 + 8, o.tiles, 9 * 8, 7 * 8, 0, 0) : e.render(s * 16 + 0, n * 16 + 8, o.tiles, (d ? 6 : 7) * 8, (l ? 8 : 7) * 8, 0, 0), !l && !f ? p || e.render(s * 16 + 8, n * 16 + 8, o.tiles, 10 * 8, 7 * 8, 0, 0) : e.render(s * 16 + 8, n * 16 + 8, o.tiles, (f ? 8 : 7) * 8, (l ? 8 : 7) * 8, 0, 0)
    }

    interact(e, i, s, n, r, l) {
        return !(r instanceof S) || r.toolType !== v.shovel || !n.payStamina(4 - r.level) ? !1 : (e.add(new A(new R(c.sand), i * 16 + h.nextInt(10) + 3, s * 16 + h.nextInt(10) + 3)), e.setTile(i, s, h.names.dirt, 0), !0)
    }
}

class re extends h {
    constructor() {
        super(...arguments);
        u(this, "connectsToSand", !0)
    }

    render(e, i, s, n) {
        h.tiles[6].render(e, i, s, n), e.render(s * 16 + 0, n * 16 + 0, o.tiles, 6 * 8, 0, 0, 0), e.render(s * 16 + 8, n * 16, o.tiles, 7 * 8, 0, 0, 0), e.render(s * 16, n * 16 + 8, o.tiles, 6 * 8, 8, 0, 0), e.render(s * 16 + 8, n * 16 + 8, o.tiles, 7 * 8, 8, 0, 0)
    }

    mayPass(e, i, s, n) {
        return !1
    }

    bumpedInto(e, i, s, n) {
        n.tileHurt(this, i, s, 1)
    }
}

class ae extends h {
    constructor() {
        super(...arguments);
        u(this, "connectsToSand", !0);
        u(this, "connectsToWater", !0);
        u(this, "connectsToLava", !0)
    }

    render(e, i, s, n) {
        let r = !i.getTile(s, n - 1).connectsToLiquid(), l = !i.getTile(s, n + 1).connectsToLiquid(),
            d = !i.getTile(s - 1, n).connectsToLiquid(), f = !i.getTile(s + 1, n).connectsToLiquid();
        !r && !d ? e.render(16 * s, 16 * n, o.tiles, 27 * 8, 6 * 8, 0, 0) : e.render(16 * s, 16 * n, K(this.id, (d ? 24 : 25) * 8, (r ? 6 : 7) * 8, "816953"), 0, 0, 0, 0), !r && !f ? e.render(16 * s + 8, 16 * n, o.tiles, 28 * 8, 6 * 8, 0, 0) : e.render(16 * s + 8, 16 * n, K(this.id, (f ? 26 : 25) * 8, (r ? 6 : 7) * 8, "816953"), 0, 0, 0, 0), !l && !d ? e.render(16 * s, 16 * n + 8, o.tiles, 27 * 8, 7 * 8, 0, 0) : e.render(16 * s, 16 * n + 8, K(this.id, (d ? 24 : 25) * 8, (l ? 8 : 7) * 8, "816953"), 0, 0, 0, 0), !l && !f ? e.render(16 * s + 8, 16 * n + 8, o.tiles, 28 * 8, 7 * 8, 0, 0) : e.render(16 * s + 8, 16 * n + 8, K(this.id, (f ? 26 : 25) * 8, (l ? 8 : 7) * 8, "816953"), 0, 0, 0, 0)
    }

    mayPass(e, i, s, n) {
        return n.canSwim()
    }
}

class Ut extends h {
    constructor(t, e, i, s) {
        super(t, e), this.onType = i, this.growsTo = s
    }

    render(t, e, i, s) {
        this.onType.render(t, e, i, s), t.render(i * 16 + 4, s * 16 + 4, o.tiles, 12 * 8, 8, 0, 0)
    }

    tick(t, e, i) {
        const s = t.getData(e, i) + 1;
        s > 100 ? t.setTile(e, i, this.growsTo, 0) : t.setData(e, i, s)
    }

    hurt(t, e, i, s, n, r) {
        t.setTile(e, i, this.onType, 0)
    }
}

class he extends h {
    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 12 * 8, 0, 0, 1), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 12 * 8, 0, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 12 * 8, 0, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 12 * 8, 0, 0, 1)
    }

    tick(t, e, i) {
        let s = t.getData(e, i);
        s < 5 && t.setData(e, i, s + 1)
    }

    interact(t, e, i, s, n, r) {
        return n instanceof S && n.toolType === v.shovel && s.payStamina(4 - n.level) ? (t.setTile(e, i, h.names.dirt, 0), !0) : !1
    }

    steppedOn(t, e, i, s) {
    }
}

class le extends h {
    render(t, e, i, s) {
        let n = e.getData(i, s), r = Math.floor(n / 10);
        r > 5 && (r = 5), t.render(i * 16 + 0, s * 16 + 0, o.tiles, 12 * 8, 0, 0, 1), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 12 * 8, 0, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 12 * 8, 0, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 12 * 8, 0, 0, 1), t.render(i * 16 + 0, s * 16 + 0, o.tiles, (13 + r) * 8, 0, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, (13 + r) * 8, 0, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, (13 + r) * 8, 0, 0, 1), t.render(i * 16 + 8, s * 16 + 8, o.tiles, (13 + r) * 8, 0, 0, 1)
    }

    tick(t, e, i) {
        if (h.nextInt(2) === 0) return;
        let s = t.getData(e, i);
        s < 50 && t.setData(e, i, s + 1)
    }

    hurt(t, e, i, s, n, r, l) {
        this.harvest(t, e, i)
    }

    harvest(t, e, i) {
        let s = t.getData(e, i), n = h.nextInt(2);
        for (let r = 0; r < n; r++) t.add(new A(new R(c.seeds), e * 16 + h.nextInt(10) + 3, i * 16 + h.nextInt(10) + 3));
        n = 0, s == 50 ? n = h.nextInt(3) + 2 : s >= 40 && (n = h.nextInt(2) + 1);
        for (let r = 0; r < n; r++) t.add(new A(new R(c.wheat), e * 16 + h.nextInt(10) + 3, i * 16 + h.nextInt(10) + 3));
        t.setTile(e, i, h.names.dirt, 0)
    }
}

class oe extends h {
    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 2 * 8, 8, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 3 * 8, 8, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 4 * 8, 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 5 * 8, 8, 0, 0)
    }

    mayPass(t, e, i, s) {
        return s.canSwim()
    }

    getLightRadius(t, e, i) {
        return 6
    }
}

class Gt extends h {
    constructor(t, e, i) {
        super(t, e), this.leadsUp = i
    }

    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, (21 - 2 * this.leadsUp) * 8, 0, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, (22 - 2 * this.leadsUp) * 8, 0, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, (21 - 2 * this.leadsUp) * 8, 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, (22 - 2 * this.leadsUp) * 8, 8, 0, 0)
    }
}

class de extends h {
    render(t, e, i, s) {
    }

    mayPass(t, e, i, s) {
        return s instanceof X
    }
}

class ce extends h {
    render(t, e, i, s) {
        e.getTile(i, s - 1) === h.infiniteFall, e.getTile(i, s + 1) === h.infiniteFall, e.getTile(i - 1, s) === h.infiniteFall, e.getTile(i + 1, s) === h.infiniteFall, e.getTile(i - 1, s - 1) === h.infiniteFall, e.getTile(i - 1, s + 1) === h.infiniteFall, e.getTile(i + 1, s - 1) === h.infiniteFall, e.getTile(i + 1, s + 1) === h.infiniteFall, t.render(i * 16 + 0, s * 16 + 0, o.tiles, 3 * 8, 22 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 4 * 8, 22 * 8, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 3 * 8, 23 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 4 * 8, 23 * 8, 0, 0)
    }
}

class fe extends Wt {
    interact(t, e, i, s, n, r) {
        return !(n instanceof S) || n.toolType !== v.pickaxe || n.level < 4 || !s.payStamina(4 - n.level) ? !1 : (this.hurt(t, e, i, s, h.nextInt(10) + n.level * 5 + 10, r), !0)
    }
}

class Ht extends h {
    constructor(t, e, i) {
        super(t, e), this.resourceDrop = i
    }

    mayPass(t, e, i, s) {
        return !1
    }

    interact(t, e, i, s, n, r) {
        return !(n instanceof S) || n.toolType !== v.pickaxe || !s.payStamina(6 - n.level) ? !1 : (this.hurt(t, e, i, s, h.nextInt(10) + n.level * 5 + 10, r), !0)
    }

    hurt(t, e, i, s, n, r) {
        const l = t.getData(e, i) + 1;
        if (t.add(new Ot(e * 16 + 8, i * 16 + 8)), t.add(new W("" + n, e * 16 + 8, i * 16 + 8, 0)), l > 0) {
            let d = h.nextInt(2);
            l >= h.nextInt(10) + 3 ? (t.setTile(e, i, h.names.dirt, 0), d += 2) : t.setData(e, i, l);
            for (let f = 0; f < d; f++) t.add(new A(new R(this.resourceDrop, 1), e * 16 + h.nextInt(10) + 3, i * 16 + h.nextInt(10) + 3))
        }
    }
}

class ue extends Ht {
    constructor(t, e) {
        super(t, e, c.ironOre)
    }

    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 24 * 8, 0 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 25 * 8, 0 * 8, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 24 * 8, 1 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 25 * 8, 1 * 8, 0, 0)
    }
}

class me extends Ht {
    constructor(t, e) {
        super(t, e, c.goldOre)
    }

    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 28 * 8, 0 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 29 * 8, 0 * 8, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 28 * 8, 1 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 29 * 8, 1 * 8, 0, 0)
    }
}

class pe extends Ht {
    constructor(t, e) {
        super(t, e, c.gem)
    }

    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 30 * 8, 0 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 31 * 8, 0 * 8, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 30 * 8, 1 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 31 * 8, 1 * 8, 0, 0)
    }
}

class ge extends h {
    render(t, e, i, s) {
        t.render(i * 16 + 0, s * 16 + 0, o.tiles, 6 * 8, 2 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 0, o.tiles, 7 * 8, 2 * 8, 0, 0), t.render(i * 16 + 0, s * 16 + 8, o.tiles, 6 * 8, 3 * 8, 0, 0), t.render(i * 16 + 8, s * 16 + 8, o.tiles, 7 * 8, 3 * 8, 0, 0)
    }

    mayPass(t, e, i, s) {
        return s instanceof X
    }

    interact(t, e, i, s, n, r) {
        return !(n instanceof S) || n.toolType !== v.pickaxe || !s.payStamina(6 - n.level) ? !1 : (this.hurt(t, e, i, s, 1, r), !0)
    }

    hurt(t, e, i, s, n, r) {
        const l = t.getData(e, i) + 1;
        t.add(new Ot(e * 16 + 8, i * 16 + 8)), t.add(new W("" + n, e * 16 + 8, i * 16 + 8, 0)), l >= 10 ? t.setTile(e, i, h.names.cloud, 0) : t.setData(e, i, l)
    }

    bumpedInto(t, e, i, s) {
        s instanceof X || s.tileHurt(this, e, i, 3)
    }
}

function we() {
    new Xt(0, "grass"), new Wt(1, "rock"), new pt(2, "water"), new ee(3, "flower"), new ie(4, "tree"), new se(5, "dirt"), new ne(6, "sand"), new re(7, "cactus"), new ae(8, "hole"), new Ut(9, "treeSapling", h.names.grass, h.names.tree), new Ut(10, "cactusSapling", h.names.sand, h.names.cactus), new he(11, "farmland"), new le(12, "wheat"), new oe(13, "lava"), new Gt(14, "stairsDown", !1), new Gt(15, "stairsUp", !0), new de(16, "infiniteFall"), new ce(17, "cloud"), new fe(18, "hardRock"), new ue(19, "ironOre"), new me(20, "goldOre"), new pe(21, "gemOre"), new ge(22, "cloudCactus"), $t()
}

we();
let ct = new Math.seedrandom("123123871283");

function E(a) {
    return Math.floor(ct.quick() * a)
}

class H {
    constructor(t, e, i) {
        this.h = e, this.w = e, this.values = [];
        for (let l = 0; l < t; l += i) for (let d = 0; d < t; d += i) this.setSample(d, l, ct.quick() * 2 - 1);
        let s = i, n = 1 / t, r = 1;
        do {
            let l = s / 2;
            for (let d = 0; d < t; d += s) for (let f = 0; f < t; f += s) {
                let p = this.sample(f, d), w = this.sample(f + s, d), T = this.sample(f, d + s),
                    x = this.sample(f + s, d + s), g = (p + w + T + x) / 4 + (ct.quick() * 2 - 1) * s * n;
                this.setSample(f + l, d + l, g)
            }
            for (let d = 0; d < t; d += s) for (let f = 0; f < t; f += s) {
                let p = this.sample(f, d), w = this.sample(f + s, d);
                this.sample(f, d + s);
                let T = this.sample(f + l, d + l), x = this.sample(f + l, d - l), g = this.sample(f - l, d + l),
                    k = (p + w + T + x) / 4 + (ct.quick() * 2 - 1) * s * n * .5,
                    C = (p + w + T + g) / 4 + (ct.quick() * 2 - 1) * s * n * .5;
                this.setSample(f + l, d, k), this.setSample(f, d + l, C)
            }
            s /= 2, n *= r + .8, r *= .3
        } while (s > 1)
    }

    sample(t, e) {
        return this.values[(t & this.w - 1) + (e & this.h - 1) * this.w]
    }

    setSample(t, e, i) {
        this.values[(t & this.w - 1) + (e & this.h - 1) * this.w] = i
    }
}

function ye(a, t) {
    do {
        let e = ke(a, t), i = new Array(256);
        for (let s = 0; s < a * t; s++) i[e[0][s] & 255]++;
        if (!(i[h.names.rock.id & 255] < 100) && !(i[h.names.sand.id & 255] < 100) && !(i[h.names.grass.id & 255] < 100) && !(i[h.names.tree.id & 255] < 100) && !(i[h.names.stairsDown.id & 255] < 2)) return e
    } while (!0)
}

function xe(a, t, e) {
    do {
        let i = ve(a, t, e), s = new Array(256);
        for (let n = 0; n < a * t; n++) s[i[0][n] & 255]++;
        if (!(s[h.names.rock.id & 255] < 100) && !(s[h.names.dirt.id & 255] < 100) && !(s[(h.names.ironOre.id & 255) + e - 1] < 20) && !(e < 3 && s[h.names.stairsDown.id & 255] < 2)) return i
    } while (!0)
}

function Te(a, t) {
    do {
        let e = Ie(a, t), i = new Array(256);
        for (let s = 0; s < a * t; s++) i[e[0][s] & 255]++;
        if (!(i[h.names.cloud.id & 255] < 2e3) && !(i[h.names.stairsDown.id & 255] < 2)) return e
    } while (!0)
}

function ke(a, t) {
    let e = new H(a, t, 16), i = new H(a, t, 16), s = new H(a, t, 16), n = new H(a, t, 32), r = new H(a, t, 32),
        l = new Array(a * t), d = new Array(a * t);
    for (let p = 0; p < t; p++) for (let w = 0; w < a; w++) {
        let T = w + p * a, x = Math.abs(n.values[T] - r.values[T]) * 3 - 2, g = Math.abs(e.values[T] - i.values[T]);
        g = Math.abs(g - s.values[T]) * 3 - 2;
        let k = w / (a - 1) * 2 - 1, C = p / (t - 1) * 2 - 1;
        k < 0 && (k = -k), C < 0 && (C = -C);
        let D = k >= C ? k : C;
        D = D * D * D * D, D = D * D * D * D, x = x + 1 - D * 20, x < -.5 ? l[T] = h.names.water.id : x > .5 && g < -1.5 ? l[T] = h.names.rock.id : l[T] = h.names.grass.id
    }
    for (let p = 0; p < a * t / 2800; p++) {
        let w = E(a), T = E(t);
        for (let x = 0; x < 10; x++) {
            let g = w + E(21) - 10, k = T + E(21) - 10;
            for (let C = 0; C < 100; C++) {
                let D = g + E(5) - E(5), M = k + E(5) - E(5);
                for (let B = M - 1; B <= M + 1; B++) for (let V = D - 1; V <= D + 1; V++) V >= 0 && B >= 0 && V < a && B < t && l[V + B * a] == h.names.grass.id && (l[V + B * a] = h.names.sand.id)
            }
        }
    }
    for (let p = 0; p < a * t / 400; p++) {
        let w = E(a), T = E(t);
        for (let x = 0; x < 200; x++) {
            let g = w + E(15) - E(15), k = T + E(15) - E(15);
            g >= 0 && k >= 0 && g < a && k < t && l[g + k * a] == h.names.grass.id && (l[g + k * a] = h.names.tree.id)
        }
    }
    for (let p = 0; p < a * t / 400; p++) {
        let w = E(a), T = E(t), x = E(4);
        for (let g = 0; g < 30; g++) {
            let k = w + E(5) - E(5), C = T + E(5) - E(5);
            k >= 0 && C >= 0 && k < a && C < t && l[k + C * a] == h.names.grass.id && (l[k + C * a] = h.names.flower.id, d[k + C * a] = x + E(4) * 16)
        }
    }
    for (let p = 0; p < a * t / 100; p++) {
        let w = E(a), T = E(t);
        w >= 0 && T >= 0 && w < a && T < t && l[w + T * a] == h.names.sand.id && (l[w + T * a] = h.names.cactus.id)
    }
    let f = 0;
    t:for (let p = 0; p < a * t / 100; p++) {
        let w = E(a - 2) + 1, T = E(t - 2) + 1;
        for (let x = T - 1; x <= T + 1; x++) for (let g = w - 1; g <= w + 1; g++) if (l[g + x * a] != h.names.rock.id) continue t;
        if (l[w + T * a] = h.names.stairsDown.id, f++, f == 4) break
    }
    return [l, d]
}

function ve(a, t, e) {
    let i = new H(a, t, 16), s = new H(a, t, 16), n = new H(a, t, 16), r = new H(a, t, 16), l = new H(a, t, 16),
        d = new H(a, t, 16), f = new H(a, t, 16), p = new H(a, t, 16), w = new H(a, t, 16), T = new H(a, t, 32),
        x = new H(a, t, 32), g = new Array(a * t), k = new Array(a * t);
    for (let C = 0; C < t; C++) for (let D = 0; D < a; D++) {
        let M = D + C * a, B = Math.abs(T.values[M] - x.values[M]) * 3 - 2, V = Math.abs(i.values[M] - s.values[M]);
        V = Math.abs(V - n.values[M]) * 3 - 2;
        let N = Math.abs(r.values[M] - l.values[M]);
        N = Math.abs(N - d.values[M]) * 3 - 2;
        let J = Math.abs(f.values[M] - p.values[M]);
        J = Math.abs(N - w.values[M]) * 3 - 2;
        let ht = D / (a - 1) * 2 - 1, lt = C / (t - 1) * 2 - 1;
        ht < 0 && (ht = -ht), lt < 0 && (lt = -lt);
        let P = ht >= lt ? ht : lt;
        P = P * P * P * P, P = P * P * P * P, B = B + 1 - P * 20, B > -2 && J < -2 + e / 2 * 3 ? e > 2 ? g[M] = h.names.lava.id : g[M] = h.names.water.id : B > -2 && (V < -1.7 || N < -1.4) ? g[M] = h.names.dirt.id : g[M] = h.names.rock.id
    }
    {
        let C = 2;
        for (let D = 0; D < a * t / 400; D++) {
            let M = E(a), B = E(t);
            for (let V = 0; V < 30; V++) {
                let N = M + E(5) - E(5), J = B + E(5) - E(5);
                N >= C && J >= C && N < a - C && J < t - C && g[N + J * a] == h.names.rock.id && (g[N + J * a] = (h.names.ironOre.id & 255) + e - 1)
            }
        }
    }
    if (e < 3) {
        let C = 0;
        t:for (let D = 0; D < a * t / 100; D++) {
            let M = E(a - 20) + 10, B = E(t - 20) + 10;
            for (let V = B - 1; V <= B + 1; V++) for (let N = M - 1; N <= M + 1; N++) if (g[N + V * a] != h.names.rock.id) continue t;
            if (g[M + B * a] = h.names.stairsDown.id, C++, C == 4) break
        }
    }
    return [g, k]
}

function Ie(a, t) {
    let e = new H(a, t, 8), i = new H(a, t, 8), s = new Array(a * t), n = new Array(a * t);
    for (let l = 0; l < t; l++) for (let d = 0; d < a; d++) {
        let f = d + l * a, p = Math.abs(e.values[f] - i.values[f]) * 3 - 2, w = d / (a - 1) * 2 - 1,
            T = l / (t - 1) * 2 - 1;
        w < 0 && (w = -w), T < 0 && (T = -T);
        let x = w >= T ? w : T;
        x = x * x * x * x, x = x * x * x * x, p = -p * 1 - 2.2, p = p + 1 - x * 20, p < -.25 ? s[f] = h.names.infiniteFall.id : s[f] = h.names.cloud.id
    }
    t:for (let l = 0; l < a * t / 50; l++) {
        let d = E(a - 2) + 1, f = E(t - 2) + 1;
        for (let p = f - 1; p <= f + 1; p++) for (let w = d - 1; w <= d + 1; w++) if (s[w + p * a] != h.names.cloud.id) continue t;
        s[d + f * a] = h.names.cloudCactus.id
    }
    let r = 0;
    t:for (let l = 0; l < a * t; l++) {
        let d = E(a - 2) + 1, f = E(t - 2) + 1;
        for (let p = f - 1; p <= f + 1; p++) for (let w = d - 1; w <= d + 1; w++) if (s[w + p * a] != h.names.cloud.id) continue t;
        if (s[d + f * a] = h.names.stairsDown.id, r++, r == 2) break
    }
    return [s, n]
}

const et = class extends Tt {
    constructor(e) {
        super();
        u(this, "xa", 0);
        u(this, "ya", 0);
        u(this, "lvl", 0);
        u(this, "randomWalkTime", 0);
        this.lvl = e, this.x = this.nextInt(64 * 16), this.y = this.nextInt(64 * 16), this.maxHealth = e * e * 10, this.health = this.maxHealth
    }

    tick() {
        if (super.tick(), this.level.player != null && this.randomWalkTime == 0) {
            let i = this.level.player.x - this.x, s = this.level.player.y - this.y;
            i * i + s * s < 50 * 50 && (this.xa = 0, this.ya = 0, i < 0 && (this.xa = -1), i > 0 && (this.xa = 1), s < 0 && (this.ya = -1), s > 0 && (this.ya = 1))
        }
        let e = this.tickTime & 1;
        (!this.move(this.xa * e, this.ya * e) || this.nextInt(200) == 0) && (this.randomWalkTime = 60, this.xa = (this.nextInt(3) - 1) * this.nextInt(2), this.ya = (this.nextInt(3) - 1) * this.nextInt(2)), this.randomWalkTime > 0 && this.randomWalkTime--
    }

    render(e) {
        let i = 8;
        this.walkDist >> 3 & 1, this.walkDist >> 3 & 1, this.dir == 1 && (i += 2), this.dir > 1 && (this.walkDist >> 4 & 1, this.dir == 2, i += 4 + (this.walkDist >> 3 & 1) * 2);
        let s = this.x - 8, n = this.y - 11;
        e.render(s + 0, n + 0, o.entities, i * 8, 0, 0, 0), e.render(s + 8, n + 0, o.entities, (i + 1) * 8, 0, 0, 0), e.render(s + 0, n + 8, o.entities, i * 8, 8, 0, 0), e.render(s + 8, n + 8, o.entities, (i + 1) * 8, 8, 0, 0)
    }

    touchedBy(e) {
        e instanceof j && e.mobHurt(this, this.lvl + 1, this.dir)
    }

    die() {
        super.die();
        const e = et.nextInt(2) + 1;
        for (let i = 0; i < e; i++) this.level.add(new A(new R(c.cloth), this.x + et.nextInt(11) - 5, this.y + et.nextInt(11) - 5));
        this.level.player != null && (this.level.player.score += 50 * this.lvl)
    }
};
let ft = et;
u(ft, "random", new Math.seedrandom), u(ft, "nextInt", function (e) {
    return Math.floor(et.random.quick() * e)
});
const xt = class extends Tt {
    constructor(e) {
        super();
        u(this, "xa", 0);
        u(this, "ya", 0);
        u(this, "jumpTime", 0);
        u(this, "lvl", 0);
        this.lvl = e, this.x = this.nextInt(64 * 16), this.y = this.nextInt(64 * 16), this.maxHealth = e * e * 5, this.health = this.maxHealth
    }

    tick() {
        super.tick();
        let e = 1;
        if ((!this.move(this.xa * e, this.ya * e) || this.nextInt(40) == 0) && this.jumpTime <= -10) {
            if (this.xa = this.nextInt(3) - 1, this.ya = this.nextInt(3) - 1, this.level.player != null) {
                let i = this.level.player.x - this.x, s = this.level.player.y - this.y;
                i * i + s * s < 50 * 50 && (i < 0 && (this.xa = -1), i > 0 && (this.xa = 1), s < 0 && (this.ya = -1), s > 0 && (this.ya = 1))
            }
            (this.xa != 0 || this.ya != 0) && (this.jumpTime = 10)
        }
        this.jumpTime--, this.jumpTime == 0 && (this.xa = 0, this.ya = 0)
    }

    die() {
        super.die();
        let e = this.nextInt(2) + 1;
        for (let i = 0; i < e; i++) this.level.add(new A(new R(c.slime), this.x + xt.nextInt(11) - 5, this.y + xt.nextInt(11) - 5));
        this.level.player != null && (this.level.player.score += 25 * this.lvl)
    }

    render(e) {
        let i = 0, s = this.x - 8, n = this.y - 11;
        this.jumpTime > 0 && (i += 2, n -= 4), e.render(s + 0, n + 0, o.entities, i * 8, 0, 0, 0), e.render(s + 8, n + 0, o.entities, (i + 1) * 8, 0, 0, 0), e.render(s + 0, n + 8, o.entities, i * 8, 8, 0, 0), e.render(s + 8, n + 8, o.entities, (i + 1) * 8, 8, 0, 0)
    }

    touchedBy(e) {
        e instanceof j && e.mobHurt(this, this.lvl, this.dir)
    }
};
let ut = xt;
u(ut, "random", new Math.seedrandom), u(ut, "nextInt", function (e) {
    return Math.floor(xt.random.quick() * e)
});

class ot {
    constructor(t, e, i, s) {
        this.random = new Math.seedrandom, this.w = t, this.h = e, this.tiles = [], this.entities = [], this.entitiesInTiles = [], this.depth = i, this.monsterDensity = 8, this.entities = [], this.player = void 0, this.rowSprites = [], i < 0 && (this.dirtColor = 222);
        let n = [];
        if (i == 0 ? n = ye(t, e) : i < 0 ? (n = xe(t, e, -i), this.monsterDensity = 4) : (n = Te(t, e), this.monsterDensity = 4), this.tiles = n[0], this.data = n[1], s !== void 0) {
            for (let r = 0; r < e; r++) for (let l = 0; l < t; l++) if (s.getTile(l, r) === h.names.stairsDown) {
                this.setTile(l, r, h.names.stairsUp, 0);
                let d = h.names.dirt;
                i == 0 && (d = h.names.hardRock), this.setTile(l - 1, r, d, 0), this.setTile(l + 1, r, d, 0), this.setTile(l, r - 1, d, 0), this.setTile(l, r + 1, d, 0), this.setTile(l - 1, r - 1, d, 0), this.setTile(l - 1, r + 1, d, 0), this.setTile(l + 1, r - 1, d, 0), this.setTile(l + 1, r + 1, d, 0)
            }
        }
        this.entitiesInTiles = new Array(t * e);
        for (let r = 0; r < t * e; r++) this.entitiesInTiles[r] = [];
        if (i === 1) {
            const r = new X;
            r.x = this.w * 8, r.y = this.h * 8, this.add(r)
        }
    }

    nextInt(t) {
        return Math.floor(this.random.quick() * t)
    }

    renderBackground(t, e, i) {
        let s = e >> 4, n = i >> 4, r = t.w + 15 >> 4, l = t.h + 15 >> 4;
        t.setOffset(e, i);
        for (let d = n - 2; d <= l + n + 2; d++) for (let f = s - 2; f <= r + s + 2; f++) this.getTile(f, d).render(t, this, f, d);
        t.setOffset(0, 0)
    }

    renderSprites(t, e, i) {
        let s = e >> 4, n = i >> 4, r = t.w + 15 >> 4, l = t.h + 15 >> 4;
        t.setOffset(e, i);
        for (let d = n - 2; d <= l + n + 2; d++) {
            for (let f = s - 2; f <= r + s + 2; f++) {
                if (f < 0 || d < 0 || f >= this.w || d >= this.h) continue;
                const p = this.entitiesInTiles[f + d * this.w];
                for (let w = 0; w < p.length; w++) this.rowSprites.push(p[w])
            }
            this.rowSprites.length > 0 && this.sortAndRender(t, this.rowSprites), this.rowSprites.length = 0
        }
        t.setOffset(0, 0)
    }

    renderLight(t, e, i) {
        let s = e >> 4, n = i >> 4, r = t.w + 15 >> 4, l = t.h + 15 >> 4;
        t.setOffset(e, i);
        let d = 4;
        for (let f = n - d; f <= l + n + d; f++) for (let p = s - d; p <= r + s + d; p++) {
            if (p < 0 || f < 0 || p >= this.w || f >= this.h) continue;
            let w = this.entitiesInTiles[p + f * this.w];
            for (let x = 0; x < w.length; x++) {
                let g = w[x], k = g.getLightRadius();
                k > 0 && t.renderLight(g.x - 1, g.y - 4, k * 8)
            }
            let T = this.getTile(p, f).getLightRadius(this, p, f);
            T > 0 && t.renderLight(p * 16 + 8, f * 16 + 8, T * 8)
        }
        t.setOffset(0, 0)
    }

    sortAndRender(t, e) {
        e.sort(this.spriteSorter);
        for (let i = 0; i < e.length; i++) e[i].render(t)
    }

    getTile(t, e) {
        return t < 0 || e < 0 || t >= this.w || e >= this.h ? h.names.rock : h.tiles[this.tiles[t + e * this.w]]
    }

    setTile(t, e, i, s) {
        t < 0 || e < 0 || t >= this.w || e >= this.h || (this.tiles[t + e * this.w] = i.id, this.data[t + e * this.w] = s)
    }

    getData(t, e) {
        return t < 0 || e < 0 || t >= this.w || e >= this.h ? 0 : this.data[t + e * this.w] & 255
    }

    setData(t, e, i) {
        t < 0 || e < 0 || t >= this.w || e >= this.h || (this.data[t + e * this.w] = i)
    }

    add(t) {
        t instanceof j && (this.player = t), t.removed = !1, this.entities.push(t), t.init(this), this.insertEntity(t.x >> 4, t.y >> 4, t)
    }

    remove(t) {
        this.entities.splice(this.entities.indexOf(t), 1);
        let e = t.x >> 4, i = t.y >> 4;
        this.removeEntity(e, i, t)
    }

    insertEntity(t, e, i) {
        t < 0 || e < 0 || t >= this.w || e >= this.h || this.entitiesInTiles[t + e * this.w].push(i)
    }

    removeEntity(t, e, i) {
        if (t < 0 || e < 0 || t >= this.w || e >= this.h) return;
        const s = this.entitiesInTiles[t + e * this.w];
        s.splice(s.indexOf(i), 1)
    }

    trySpawn(t) {
        for (let e = 0; e < t; e++) {
            let i, s = 1, n = 1;
            this.depth < 0 && (n = -this.depth + 1), this.depth > 0 && (s = n = 4);
            let r = this.nextInt(n - s + 1) + s;
            this.nextInt(2) == 0 ? i = new ut(r) : i = new ft(r), i.findStartPos(this) && this.add(i)
        }
    }

    tick() {
        this.trySpawn(1);
        for (let t = 0; t < this.w * this.h / 50; t++) {
            let e = this.nextInt(this.w), i = this.nextInt(this.h);
            this.getTile(e, i).tick(this, e, i)
        }
        for (let t = 0; t < this.entities.length; t++) {
            let e = this.entities[t], i = e.x >> 4, s = e.y >> 4;
            if (e.tick(), e.removed) this.entities.splice(t--, 1), this.removeEntity(i, s, e); else {
                let n = e.x >> 4, r = e.y >> 4;
                (i != n || s != r) && (this.removeEntity(i, s, e), this.insertEntity(n, r, e))
            }
        }
    }

    getEntities(t, e, i, s) {
        let n = [], r = (t >> 4) - 1, l = (e >> 4) - 1, d = (i >> 4) + 1, f = (s >> 4) + 1;
        for (let p = l; p <= f; p++) for (let w = r; w <= d; w++) {
            if (w < 0 || p < 0 || w >= this.w || p >= this.h) continue;
            let T = this.entitiesInTiles[w + p * this.w];
            for (let x = 0; x < T.length; x++) {
                let g = T[x];
                g.intersects(t, e, i, s) && n.push(g)
            }
        }
        return n
    }
}

const Dt = class {
    constructor(t, e, i, s, n) {
        u(this, "xOffset", 0);
        u(this, "yOffset", 0);
        u(this, "dither", [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]);
        this.sheet = i, this.w = t, this.h = e, this.pixels = new Array(t * e), this.ctx = s, this.canvas = n
    }

    clear(t) {
        this.ctx.fillStyle = t, this.ctx.fillRect(0, 0, this.w, this.h)
    }

    render(t, e, i, s, n, r, l) {
        t -= this.xOffset, e -= this.yOffset;
        let d = (l & Dt.BIT_MIRROR_X) > 0, f = (l & Dt.BIT_MIRROR_Y) > 0;
        t < -16 || t > this.w + 16 || e < -16 || e > this.h + 16 || (d && f ? (this.ctx.scale(-1, -1), this.ctx.drawImage(i, s, n, 8, 8, -t - 8, -e - 8, 8, 8), this.ctx.scale(-1, -1)) : d ? (this.ctx.scale(-1, 1), this.ctx.drawImage(i, s, n, 8, 8, -t - 8, e, 8, 8), this.ctx.scale(-1, 1)) : f ? (this.ctx.scale(1, -1), this.ctx.drawImage(i, s, n, 8, 8, t, -e - 8, 8, 8), this.ctx.scale(1, -1)) : this.ctx.drawImage(i, s, n, 8, 8, t, e, 8, 8))
    }

    setOffset(t, e) {
        this.xOffset = t, this.yOffset = e
    }

    overlay(t, e, i) {
        this.ctx.drawImage(t.canvas, 0, 0)
    }

    renderLight(t, e, i) {
        t -= this.xOffset, e -= this.yOffset;
        let s = t - i, n = t + i, r = e - i, l = e + i;
        s < 0 && (s = 0), r < 0 && (r = 0), n > this.w && (n = this.w), l > this.h && (l = this.h);
        const d = i * i, f = i * .7 * (i * .7);
        for (let w = r; w < l; w++) {
            const T = (w - e) * (w - e);
            for (let x = s; x < n; x++) {
                const g = x - t, k = g * g + T;
                k <= f || k <= d && this.ctx.clearRect(x, w, 8, 8)
            }
        }
        const p = i * .705;
        this.ctx.clearRect(t - p, e - p, p * 2, p * 2)
    }
};
let tt = Dt;
u(tt, "BIT_MIRROR_X", 1), u(tt, "BIT_MIRROR_Y", 2);

class Mt {
    constructor(t) {
        this.game = t
    }

    tick() {
    }

    render(t) {
    }

    renderItemList(t, e, i, s, n, r, l) {
        let d = !0;
        l < 0 && (l = -l - 1, d = !1);
        const f = s - e, p = n - i - 1, w = 0;
        let T = r.length;
        T > p && (T = p);
        let x = Math.floor(l - p / 2);
        x > r.length - p && (x = r.length - p), x < 0 && (x = 0);
        for (let g = w; g < T; g++) r[g + x].renderInventory(t, (1 + e) * 8, (g + 1 + i) * 8);
        if (d) {
            const g = l + 1 - x + i;
            L.draw(">", t, (e + 0) * 8, g * 8, 0), L.draw("<", t, (e + f) * 8, g * 8, 0)
        }
    }
}

class Ee extends Mt {
    constructor(t, e) {
        super(t), this.selected = 0, this.player = e
    }

    tick() {
        m.isClicked("MENU", y) && this.game.clearMenu(), m.isClicked("MOVE_UP", y) && this.selected--, m.isClicked("MOVE_DOWN", y) && this.selected++;
        const t = this.player.inventory.items.length;
        t === 0 && (this.selected = 0), this.selected < 0 && (this.selected += t), this.selected >= t && (this.selected -= t);
        for (let e = 0; e < Et.length; e++) m.isClicked(Et[e]) && (this.player.hotbarItems[e] === this.player.inventory.items[this.selected] ? this.player.setHotbarItem(e, void 0) : this.player.setHotbarItem(e, this.player.inventory.items[this.selected]))
    }

    render(t) {
        L.renderFrame(t, "inventory", 1, 1, 12, 11), this.renderItemList(t, 1, 1, 12, 11, this.player.inventory.items, this.selected)
    }
}

class rt extends nt {
    constructor(t) {
        super(), this.name = t, this.xr = 3, this.yr = 3, this.pushTime = 0, this.pushDir = -1, this.col = 0, this.shouldTake = void 0, this.sheet = o.entities, this.sheetX = 0, this.sheetY = 0, this.sprite = {}, this.iconSheet = o.items, this.iconX = 0, this.iconY = 0, this.setSprite()
    }

    setSprite() {
        this.sprite.sheet = this.sheet, this.sprite.sheetX = this.sheetX, this.sprite.sheetY = this.sheetY, this.sprite.iconSheet = this.iconSheet, this.sprite.iconX = this.iconX, this.sprite.iconY = this.iconY
    }

    tick() {
        this.shouldTake !== void 0 && (this.shouldTake = void 0), this.pushDir == 0 && this.move(0, 1), this.pushDir == 1 && this.move(0, -1), this.pushDir == 2 && this.move(-1, 0), this.pushDir == 3 && this.move(1, 0), this.pushDir = -1, this.pushTime > 0 && this.pushTime--
    }

    render(t) {
        t.render(this.x - 8, this.y - 8 - 4, this.sheet, this.sheetX, this.sheetY, this.col, 0), t.render(this.x - 0, this.y - 8 - 4, this.sheet, this.sheetX + 8, this.sheetY, this.col, 0), t.render(this.x - 8, this.y - 0 - 4, this.sheet, this.sheetX, this.sheetY + 8, this.col, 0), t.render(this.x - 0, this.y - 0 - 4, this.sheet, this.sheetX + 8, this.sheetY + 8, this.col, 0)
    }

    blocks(t) {
        return !0
    }

    touchedBy(t) {
        t instanceof j && this.pushTime == 0 && (this.pushDir = t.dir, this.pushTime = 10)
    }

    take(t) {
        this.shouldTake = t
    }
}

class qt extends rt {
    constructor() {
        super("Workbench"), this.xr = 3, this.yr = 2, this.sheetX = 16 * 8, this.sheetY = 26 * 8, this.iconX = 4 * 8, this.iconY = 26 * 8, this.setSprite()
    }

    use(t, e) {
        return t.game.showCraftingMenu(), !0
    }
}

class Ce extends rt {
    constructor() {
        super("Oven"), this.xr = 3, this.yr = 2, this.sheetX = 12 * 8, this.sheetY = 26 * 8, this.iconX = 2 * 8, this.iconY = 26 * 8, this.setSprite()
    }

    use(t, e) {
        return t.game.showOvenMenu(), !0
    }
}

class De extends rt {
    constructor() {
        super("Lantern"), this.xr = 3, this.yr = 2, this.sheetX = 18 * 8, this.sheetY = 26 * 8, this.iconX = 5 * 8, this.iconY = 26 * 8, this.setSprite()
    }

    getLightRadius() {
        return 8
    }
}

class Oe extends rt {
    constructor() {
        super("Furnace"), this.xr = 3, this.yr = 2, this.sheetX = 14 * 8, this.sheetY = 26 * 8, this.iconX = 3 * 8, this.iconY = 26 * 8, this.setSprite()
    }

    use(t, e) {
        return t.game.showFurnaceMenu(), !0
    }
}

class Me extends rt {
    constructor() {
        super("Chest"), this.sheetX = 10 * 8, this.sheetY = 26 * 8, this.iconX = 1 * 8, this.iconY = 26 * 8, this.inventory = new Ft, this.setSprite()
    }

    use(t, e) {
        return t.game.showContainerMenu(this.inventory), !0
    }
}

class Re extends rt {
    constructor() {
        super("Anvil"), this.xr = 3, this.yr = 2, this.sheetX = 8 * 8, this.sheetY = 26 * 8, this.iconX = 0 * 8, this.iconY = 26 * 8, this.setSprite()
    }

    use(t, e) {
        return t.game.showAnvilMenu(), !0
    }
}

class st extends At {
    constructor(t) {
        super(), this.placed = !1, this.furniture = t
    }

    renderIcon(t, e, i) {
        t.render(e, i, this.furniture.iconSheet, this.furniture.iconX, this.furniture.iconY, this.furniture.col, 0)
    }

    renderInventory(t, e, i) {
        t.render(e, i, this.furniture.iconSheet, this.furniture.iconX, this.furniture.iconY, this.furniture.col, 0), L.draw(this.furniture.name, t, e + 8, i, 0)
    }

    onTake(t) {
    }

    canAttack() {
        return !1
    }

    getSprite() {
        return {sheet: this.furniture.iconSheet, sheetX: this.furniture.iconX, sheetY: this.furniture.iconY}
    }

    matches(t) {
        return t instanceof st ? this.furniture.constructor.name === t.furniture.constructor.name : !1
    }

    interactOn(t, e, i, s, n, r) {
        return t.mayPass(e, i, s, this.furniture) ? (this.furniture.x = i * 16 + 8, this.furniture.y = s * 16 + 8, e.add(this.furniture), this.placed = !0, !0) : !1
    }

    isDepleted() {
        return this.placed
    }

    getName() {
        return this.furniture.name
    }
}

function Se(a, t) {
    return t.canCraft && !a.canCraft ? 1 : !t.canCraft && a.canCraft ? -1 : 0
}

class vt extends Mt {
    constructor(t, e, i) {
        super(t), this.recipes = e, this.player = i, this.selected = 0;
        for (let s = 0; s < this.recipes.length; s++) this.recipes[s].checkCanCraft(this.player);
        this.recipes.sort(Se)
    }

    tick() {
        m.isClicked("MENU", y) && this.game.clearMenu(), m.isClicked("MOVE_UP", y) && this.selected--, m.isClicked("MOVE_DOWN", y) && this.selected++;
        const t = this.recipes.length;
        if (t === 0 && (this.selected = 0), this.selected < 0 && (this.selected += t), this.selected >= t && (this.selected -= t), m.isClicked("ATTACK", y) && t > 0) {
            const e = this.recipes[this.selected];
            e.checkCanCraft(this.player), e.canCraft && (e.deductCost(this.player), e.craft(this.player));
            for (let i = 0; i < this.recipes.length; i++) this.recipes[i].checkCanCraft(this.player)
        }
    }

    render(t) {
        if (L.renderFrame(t, "Have", 12, 1, 19, 3), L.renderFrame(t, "Cost", 12, 4, 19, 11), L.renderFrame(t, "Crafting", 0, 1, 11, 11), this.renderItemList(t, 0, 1, 11, 11, this.recipes, this.selected), this.recipes.length > 0) {
            const e = this.recipes[this.selected], i = this.player.inventory.count(e.resultTemplate),
                s = 13 * 8, {sheet: n, sheetX: r, sheetY: l} = e.resultTemplate.getSprite();
            t.render(s, 2 * 8, n, r, l, e.resultTemplate.getColor(), 0), L.draw("" + i, t, s + 8, 2 * 8, 0);
            const d = e.costs;
            for (let f = 0; f < d.length; f++) {
                const p = d[f], w = (5 + f) * 8, T = p.getSprite();
                t.render(s, w, T.sheet, T.sheetX, T.sheetY, p.getColor(), 0);
                let x = 1;
                p instanceof R && (x = p.count);
                let g = this.player.inventory.count(p), k = 0;
                g < x && (k = 0), g > 99 && (g = 99), L.draw("" + x + "/" + g, t, s + 8, w, k)
            }
        }
    }
}

class Bt {
    constructor(t) {
        this.costs = [], this.canCraft = !1, this.resultTemplate = t
    }

    addCost(t, e) {
        return this.costs.push(new R(t, e)), this
    }

    checkCanCraft(t) {
        for (let e = 0; e < this.costs.length; e++) {
            const i = this.costs[e];
            if (!t.inventory.hasResource(i.resource, i.count)) {
                this.canCraft = !1;
                return
            }
        }
        this.canCraft = !0
    }

    renderInventory(t, e, i) {
        const s = this.resultTemplate.getSprite();
        t.render(e, i, s.sheet, s.sheetX, s.sheetY, 0, 0), L.draw(this.resultTemplate.getName(), t, e + 8, i, 0)
    }

    craft(t) {
    }

    deductCost(t) {
        for (let e = 0; e < this.costs.length; e++) {
            const i = this.costs[e];
            t.inventory.removeResource(i.resource, i.count)
        }
    }
}

class O extends Bt {
    constructor(t, e) {
        super(new S(t, e)), this.toolType = t, this.level = e
    }

    craft(t) {
        t.inventory.add(new S(this.toolType, this.level), 0)
    }
}

class Rt extends Bt {
    constructor(t) {
        super(new R(t, 1)), this.resource = t
    }

    craft(t) {
        t.inventory.add(new R(this.resource, 1), 0)
    }
}

class at extends Bt {
    constructor(t) {
        super(new st(new t.prototype.constructor)), this.furnitureClass = t
    }

    craft(t) {
        t.inventory.add(new st(new this.furnitureClass.prototype.constructor), 0)
    }
}

class I {
}

u(I, "anvilRecipes", []), u(I, "ovenRecipes", []), u(I, "furnaceRecipes", []), u(I, "workbenchRecipes", []);
I.workbenchRecipes.push(new at(De).addCost(c.wood, 5).addCost(c.slime, 10).addCost(c.glass, 4));
I.workbenchRecipes.push(new at(Ce).addCost(c.stone, 15));
I.workbenchRecipes.push(new at(Oe).addCost(c.stone, 20));
I.workbenchRecipes.push(new at(qt).addCost(c.wood, 20));
I.workbenchRecipes.push(new at(Me).addCost(c.wood, 20));
I.workbenchRecipes.push(new at(Re).addCost(c.ironIngot, 5));
I.workbenchRecipes.push(new O(v.sword, 0).addCost(c.wood, 5));
I.workbenchRecipes.push(new O(v.axe, 0).addCost(c.wood, 5));
I.workbenchRecipes.push(new O(v.hoe, 0).addCost(c.wood, 5));
I.workbenchRecipes.push(new O(v.pickaxe, 0).addCost(c.wood, 5));
I.workbenchRecipes.push(new O(v.shovel, 0).addCost(c.wood, 5));
I.workbenchRecipes.push(new O(v.sword, 1).addCost(c.wood, 5).addCost(c.stone, 5));
I.workbenchRecipes.push(new O(v.axe, 1).addCost(c.wood, 5).addCost(c.stone, 5));
I.workbenchRecipes.push(new O(v.hoe, 1).addCost(c.wood, 5).addCost(c.stone, 5));
I.workbenchRecipes.push(new O(v.pickaxe, 1).addCost(c.wood, 5).addCost(c.stone, 5));
I.workbenchRecipes.push(new O(v.shovel, 1).addCost(c.wood, 5).addCost(c.stone, 5));
I.anvilRecipes.push(new O(v.sword, 2).addCost(c.wood, 5).addCost(c.ironIngot, 5));
I.anvilRecipes.push(new O(v.axe, 2).addCost(c.wood, 5).addCost(c.ironIngot, 5));
I.anvilRecipes.push(new O(v.hoe, 2).addCost(c.wood, 5).addCost(c.ironIngot, 5));
I.anvilRecipes.push(new O(v.pickaxe, 2).addCost(c.wood, 5).addCost(c.ironIngot, 5));
I.anvilRecipes.push(new O(v.shovel, 2).addCost(c.wood, 5).addCost(c.ironIngot, 5));
I.anvilRecipes.push(new O(v.sword, 3).addCost(c.wood, 5).addCost(c.goldIngot, 5));
I.anvilRecipes.push(new O(v.axe, 3).addCost(c.wood, 5).addCost(c.goldIngot, 5));
I.anvilRecipes.push(new O(v.hoe, 3).addCost(c.wood, 5).addCost(c.goldIngot, 5));
I.anvilRecipes.push(new O(v.pickaxe, 3).addCost(c.wood, 5).addCost(c.goldIngot, 5));
I.anvilRecipes.push(new O(v.shovel, 3).addCost(c.wood, 5).addCost(c.goldIngot, 5));
I.anvilRecipes.push(new O(v.sword, 4).addCost(c.wood, 5).addCost(c.gem, 50));
I.anvilRecipes.push(new O(v.axe, 4).addCost(c.wood, 5).addCost(c.gem, 50));
I.anvilRecipes.push(new O(v.hoe, 4).addCost(c.wood, 5).addCost(c.gem, 50));
I.anvilRecipes.push(new O(v.pickaxe, 4).addCost(c.wood, 5).addCost(c.gem, 50));
I.anvilRecipes.push(new O(v.shovel, 4).addCost(c.wood, 5).addCost(c.gem, 50));
I.furnaceRecipes.push(new Rt(c.ironIngot).addCost(c.ironOre, 4).addCost(c.coal, 1));
I.furnaceRecipes.push(new Rt(c.goldIngot).addCost(c.goldOre, 4).addCost(c.coal, 1));
I.furnaceRecipes.push(new Rt(c.glass).addCost(c.sand, 4).addCost(c.coal, 1));
I.ovenRecipes.push(new Rt(c.bread).addCost(c.wheat, 4));

class be extends Mt {
    constructor(t, e, i) {
        super(t), this.inventory = e, this.player = i, this.selected = 0, this.otherSelected = 0
    }

    tick() {
        if (m.isClicked("MENU", y) && this.game.clearMenu(), m.isClicked("MOVE_LEFT", y)) {
            this.window = 0;
            let s = this.selected;
            this.selected = this.otherSelected, this.otherSelected = s
        }
        if (m.isClicked("MOVE_RIGHT", y)) {
            this.window = 1;
            let s = this.selected;
            this.selected = this.otherSelected, this.otherSelected = s
        }
        let t, e;
        this.window === 0 ? (t = this.inventory, e = this.player.inventory) : (t = this.player.inventory, e = this.inventory), m.isClicked("MOVE_UP", y) && this.selected--, m.isClicked("MOVE_DOWN", y) && this.selected++;
        const i = t.items.length;
        if (i === 0 && (this.selected = 0), this.selected < 0 && (this.selected += i), this.selected >= i && (this.selected -= i), m.isClicked("ATTACK", y) && i > 0) {
            const s = t.items[this.selected];
            t.removeItem(s), e.add(s, this.otherSelected), this.selected >= t.items.length && (this.selected = t.items.length - 1)
        }
    }

    render(t) {
        this.window == 1 && t.setOffset(6 * 8, 0), L.renderFrame(t, "Chest", 1, 1, 12, 11), this.renderItemList(t, 1, 1, 12, 11, this.inventory.items, this.window == 0 ? this.selected : -this.otherSelected - 1), L.renderFrame(t, "Inventory", 13, 1, 13 + 11, 11), this.renderItemList(t, 13, 1, 13 + 11, 11, this.player.inventory.items, this.window == 1 ? this.selected : -this.otherSelected - 1), t.setOffset(0, 0)
    }
}

class Le extends Mt {
    constructor(t, e) {
        super(t), this.time = 0, this.direction = e
    }

    tick() {
        this.time += 1, this.time === 15 ? this.game.changeLevel(this.direction) : this.time === 30 && this.game.clearMenu()
    }

    render(t) {
        for (let e = 0; e < t.w / 3; e++) for (let i = 0; i < t.h / 3; i++) {
            const s = i + e % 2 * 2 + e / 3 - this.time;
            s > 0 || s < -15 || (this.direction > 0 ? t.render(e * 8, i * 8, o.tiles, 6 * 8, 22 * 8, 0, 0) : t.render(e * 8, t.h - i * 8, o.tiles, 6 * 8, 22 * 8, 0, 0))
        }
    }
}

const z = document.getElementById("canvas"), Ae = z.getContext("2d"), F = document.createElement("canvas"),
    gt = F.getContext("2d"), it = document.createElement("canvas"), Vt = it.getContext("2d"), He = 60, Kt = 8, Be = 15,
    Ve = 20, _t = Kt * Be, Nt = Kt * Ve;
z.height = _t;
z.width = Nt;
F.height = _t;
F.width = Nt;
it.height = _t;
it.width = Nt;
gt.fillRect(0, 0, z.width, z.height);
gt.imageSmoothingEnabled = !1;
Vt.fillRect(0, 0, z.width, z.height);
Vt.imageSmoothingEnabled = !1;

function zt(a) {
    let t = a.target.innerWidth;
    const e = a.target.innerHeight;
    t * .75 > e && (t = Math.floor(e * 20 / 15)), z.style.width = t + "px"
}

window.addEventListener("resize", zt);
zt({target: {innerWidth: window.innerWidth, innerHeight: window.innerHeight}});

class _e {
    constructor() {
        this.ticks = 0, this.nextTick = 0, this.isInMenu = !1, this.menu = void 0;
        const t = new Array(5);
        t[4] = new ot(128, 128, 1, void 0), t[3] = new ot(128, 128, 0, t[4]), t[2] = new ot(128, 128, -1, t[3]), t[1] = new ot(128, 128, -2, t[2]), t[0] = new ot(128, 128, -3, t[1]), this.levels = t, this.currentLevel = 3, this.pendingLevelChange = 0, this.level = this.levels[this.currentLevel], this.screen = new tt(F.width, F.height, void 0, gt, F), this.lightScreen = new tt(it.width, it.height, void 0, Vt, it), this.player = new j(this), this.player.findStartPos(this.level), this.level.add(this.player);
        for (let e = 0; e < this.levels.length; e++) this.levels[e].trySpawn(5e3);
        this.ts = Date.now() / 1e3, this.player.inventory.add(new st(new qt)), this.player.inventory.add(new S(v.shovel, 4))
    }

    scheduleLevelChange(t) {
        this.pendingLevelChange = t
    }

    changeLevel(t) {
        this.level.remove(this.player), this.currentLevel += t, this.level = this.levels[this.currentLevel], this.player.x = (this.player.x >> 4) * 16 + 8, this.player.y = (this.player.y >> 4) * 16 + 8, this.level.add(this.player)
    }

    clearMenu() {
        this.menu = void 0
    }

    showCraftingMenu() {
        this.menu = new vt(this, I.workbenchRecipes, this.player)
    }

    showOvenMenu() {
        this.menu = new vt(this, I.ovenRecipes, this.player)
    }

    showFurnaceMenu() {
        this.menu = new vt(this, I.furnaceRecipes, this.player)
    }

    showContainerMenu(t) {
        this.menu = new be(this, t, this.player)
    }

    showAnvilMenu() {
        this.menu = new vt(this, I.anvilRecipes, this.player)
    }

    showInventoryMenu() {
        this.menu = new Ee(this, this.player)
    }

    update() {
        this.menu === void 0 ? (this.pendingLevelChange !== 0 && (this.menu = new Le(this, this.pendingLevelChange), this.pendingLevelChange = 0), this.level.tick()) : this.menu.tick(), m.isClicked("DEBUG_1", y) && this.findStairsDown(), m.isClicked("DEBUG_2", y) && this.findStairsUp(), m.isClicked("DEBUG_3", y) && this.moveAirWizard()
    }

    moveAirWizard() {
        if (this.level.depth !== 1) return;
        const t = this.level.entities;
        for (let e = 0; e < t.length; e++) {
            const i = t[e];
            if (i instanceof X) {
                i.x = this.player.x + 16, i.y = this.player.y + 16;
                return
            }
        }
    }

    findStairsDown() {
        for (let t = 0; t < this.level.tiles.length; t++) if (this.level.tiles[t] == h.names.stairsDown.id) {
            this.player.x = t % 128 * 16 + 32, this.player.y = Math.floor(t / 128) * 16;
            break
        }
    }

    findStairsUp() {
        for (let t = 0; t < this.level.tiles.length; t++) if (this.level.tiles[t] == h.names.stairsUp.id) {
            this.player.x = t % 128 * 16 + 32, this.player.y = Math.floor(t / 128) * 16;
            break
        }
    }

    renderCanvasGUI() {
        for (let t = 0; t < 10; t++) t < this.player.health ? this.screen.render(t * 8, this.screen.h - 16, o.gui, 0, 2 * 8, 0, 0) : this.screen.render(t * 8, this.screen.h - 16, o.gui, 0, 3 * 8, 0, 0), t < this.player.stamina ? this.screen.render(t * 8, this.screen.h - 8, o.gui, 8, 2 * 8, 0, 0) : this.screen.render(t * 8, this.screen.h - 8, o.gui, 8, 3 * 8, 0, 0);
        for (let t = 0; t < 10; t += 2) {
            const e = t / 2;
            if (this.screen.render(82 - e + t * 8, this.screen.h - 16, o.gui, 2 * 8, 4 * 8, 0, 0), this.screen.render(82 - e + (t + 1) * 8, this.screen.h - 16, o.gui, 2 * 8, 4 * 8, 0, 1), this.screen.render(82 - e + t * 8, this.screen.h - 8, o.gui, 2 * 8, 4 * 8, 0, 2), this.screen.render(82 - e + (t + 1) * 8, this.screen.h - 8, o.gui, 2 * 8, 4 * 8, 0, 3), this.player.activeItemIndex === e && (this.screen.render(82 - e + t * 8, this.screen.h - 16, o.gui, 2 * 8, 5 * 8, 0, 0), this.screen.render(82 - e + (t + 1) * 8, this.screen.h - 16, o.gui, 2 * 8, 5 * 8, 0, 1), this.screen.render(82 - e + t * 8, this.screen.h - 8, o.gui, 2 * 8, 5 * 8, 0, 2), this.screen.render(82 - e + (t + 1) * 8, this.screen.h - 8, o.gui, 2 * 8, 5 * 8, 0, 3)), this.player.hotbarItems[e] !== void 0) {
                const i = this.player.hotbarItems[e];
                let s = i.count;
                if (s > 99 && (s = 99), i instanceof R) L.draw("" + s, this.screen, 82 + t * 8 - e, this.screen.h - 8, 0), this.screen.render(82 + t * 8 + 4 - e, this.screen.h - 15, i.resource.sheet, i.resource.sheetX, i.resource.sheetY, 0, 0); else if (i instanceof st) this.screen.render(82 + t * 8 + 4 - e, this.screen.h - 12, i.furniture.iconSheet, i.furniture.iconX, i.furniture.iconY, 0, 0); else if (i instanceof S) {
                    const n = i.getSprite();
                    this.screen.render(82 + t * 8 + 4 - e, this.screen.h - 12, n.sheet, n.sheetX, n.sheetY, 0, 0)
                }
            }
        }
    }

    draw() {
        let t = this.player.x - this.screen.w / 2, e = this.player.y - this.screen.h / 2;
        t < 16 && (t = 16), e < 16 && (e = 16), t > this.level.w * 16 - this.screen.w - 16 && (t = this.level.w * 16 - this.screen.w - 16), e > this.level.h * 16 - this.screen.h - 16 && (e = this.level.h * 16 - this.screen.h - 16), this.level.renderBackground(this.screen, t, e), this.level.renderSprites(this.screen, t, e), this.currentLevel < 3 && (this.lightScreen.clear("#000000"), this.level.renderLight(this.lightScreen, t, e), this.screen.overlay(this.lightScreen, t, e)), this.renderCanvasGUI(), this.menu !== void 0 && this.menu.render(this.screen)
    }

    loop() {
        const t = Date.now() / 1e3, e = t - this.ts;
        for (this.ts = t, this.ticks += e * He; this.nextTick <= this.ticks;) this.update(), this.nextTick += 1, h.tickCount++;
        gt.fillStyle = "#000", gt.fillRect(0, 0, F.width, F.height), this.draw(), Ae.drawImage(F, 0, 0), window.requestAnimationFrame(this.boundLoop)
    }

    start() {
        window.requestAnimationFrame(this.boundLoop)
    }
}

const It = new _e;
It.boundLoop = It.loop.bind(It);
It.start();
