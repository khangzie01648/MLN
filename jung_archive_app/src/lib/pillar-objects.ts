import Hourglass from '@/components/3d/objects/Hourglass';
import NestedSpheres from '@/components/3d/objects/NestedSpheres';
import FloatingBook from '@/components/3d/objects/FloatingBook';
import AlchemyFlask from '@/components/3d/objects/AlchemyFlask';
import LotusFlower from '@/components/3d/objects/LotusFlower';
import EyeOfHorus from '@/components/3d/objects/EyeOfHorus';
import SacredFlame from '@/components/3d/objects/SacredFlame';
import ProceduralTree from '@/components/3d/objects/ProceduralTree';
import QuantumParticles from '@/components/3d/objects/QuantumParticles';
import ConstellationNetwork from '@/components/3d/objects/ConstellationNetwork';

export const PILLAR_OBJECT_MAP: Record<string, any> = {
    'tieu-su': Hourglass,
    biography: Hourglass,
    'khai-niem': NestedSpheres,
    concepts: NestedSpheres,
    'sach-do': FloatingBook,
    red_book: FloatingBook,
    redbook: FloatingBook,
    'gia-kim': AlchemyFlask,
    alchemy: AlchemyFlask,
    'thuc-hanh': LotusFlower,
    practice: LotusFlower,
    'bieu-tuong': EyeOfHorus,
    symbols: EyeOfHorus,
    'tam-linh': SacredFlame,
    spirit: SacredFlame,
    'di-san': ProceduralTree,
    legacy: ProceduralTree,
    'vu-tru': QuantumParticles,
    cosmos: QuantumParticles,
    'gap-go': ConstellationNetwork,
    encounters: ConstellationNetwork
};

export const PILLAR_SCALE_MAP: Record<string, number> = {
    'tieu-su': 1.2,
    biography: 1.2,
    'khai-niem': 1.4,
    concepts: 1.4,
    'sach-do': 1.7,
    red_book: 1.7,
    redbook: 1.7,
    'gia-kim': 1.4,
    alchemy: 1.4,
    'thuc-hanh': 1.8,
    practice: 1.8,
    'bieu-tuong': 1.5,
    symbols: 1.5,
    'tam-linh': 1.6,
    spirit: 1.6,
    'di-san': 1.0,
    legacy: 1.0,
    'vu-tru': 1.1,
    cosmos: 1.1,
    'gap-go': 1.3,
    encounters: 1.3
};
