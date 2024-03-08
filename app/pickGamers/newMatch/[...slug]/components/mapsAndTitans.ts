interface TitanOption {
    value: string;
    label: string;
}

interface MapOption {
    value: string;
    label: string;
}
export const titanOptions: TitanOption[] = [
    { value: 'Ion', label: 'Ion' },
    { value: 'Tone', label: 'Tone' },
    { value: 'Monarch', label: 'Monarch' },
    { value: 'Northstar', label: 'Northstar' },
    { value: 'Ronin', label: 'Ronin' },
    { value: 'Legion', label: 'Legion' },
    { value: 'Scorch', label: 'Scorch' },
];

 export const mapOptions: MapOption[] = [
    { value: 'Boomtown', label: 'Boomtown' },
    { value: 'Exo', label: 'Exo' },
    { value: 'Eden', label: 'Eden' },
    { value: 'Drydock', label: 'Drydock' },
    { value: 'Angel', label: 'Angel' },
    { value: 'Colony', label: 'Colony' },
    { value: 'Glitch', label: 'Glitch' },
];