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
    biography: Hourglass,
    concepts: NestedSpheres,
    red_book: FloatingBook,
    redbook: FloatingBook, // Alias for legacy support
    alchemy: AlchemyFlask,
    practice: LotusFlower,
    symbols: EyeOfHorus,
    spirit: SacredFlame,
    legacy: ProceduralTree,
    cosmos: QuantumParticles,
    encounters: ConstellationNetwork
};

export const PILLAR_SCALE_MAP: Record<string, number> = {
    biography: 1.2,
    concepts: 1.4,
    red_book: 1.7,
    redbook: 1.7,
    alchemy: 1.4,
    practice: 1.8,
    symbols: 1.5,
    spirit: 1.6,
    legacy: 1.0,
    cosmos: 1.1,
    encounters: 1.3
};
