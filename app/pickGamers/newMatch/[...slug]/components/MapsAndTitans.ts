interface TitanOption {
    value: string;
    label: string;
}

interface MapOption {
    value: string;
    label: string;
}
export const titanOptions: TitanOption[] = [
    { value: 'ion', label: 'Ion' },
    { value: 'tone', label: 'Tone' },
    { value: 'monarch', label: 'Monarch' },
    { value: 'northstar', label: 'Northstar' },
    { value: 'ronin', label: 'Ronin' },
    { value: 'legion', label: 'Legion' },
    { value: 'scorch', label: 'Scorch' },
];

 export const mapOptions: MapOption[] = [
    { value: 'boomtown', label: 'Boomtown' },
    { value: 'exo', label: 'Exo' },
    { value: 'eden', label: 'Eden' },
    { value: 'drydock', label: 'Drydock' },
    { value: 'angel', label: 'Angel' },
    { value: 'colony', label: 'Colony' },
    { value: 'glitch', label: 'Glitch' },
];