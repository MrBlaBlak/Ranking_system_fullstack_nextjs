class Weapon {
    id?: number
    name: string;
    weapon_class: string;
    near_damage: number;
    mid_damage: number;
    far_damage: number;
    near_distance: number;
    mid_distance: number;
    far_distance: number;
    fire_rate: number;

    constructor(id: number, name: string, weapon_class: string, near_damage: number, mid_damage: number, far_damage: number, near_distance: number, mid_distance: number, far_distance: number, fire_rate: number) {
        this.id = id;
        this.name = name;
        this.weapon_class = weapon_class
        this.near_damage = near_damage;
        this.mid_damage = mid_damage;
        this.far_damage = far_damage;
        this.near_distance = near_distance;
        this.mid_distance = mid_distance;
        this.far_distance = far_distance;
        this.fire_rate = fire_rate;
    }
}
export default Weapon;