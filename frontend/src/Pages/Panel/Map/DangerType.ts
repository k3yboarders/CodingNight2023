import BombingIcon from './icons/bombing.svg'
import AccidentIcon from './icons/accident.svg'
import TerroristsIcon from './icons/terrorists.svg'
import EarthquakeIcon from './icons/earthquake.svg'
import TornadoIcon from './icons/tornado.svg'
import TsunamiIcon from './icons/tsunami.svg'
import { Icon }  from 'leaflet'


export enum DangerType {
  BOMBING,
  TERRORIST_ATTACK,
  EARTHQUAKE,
  TSUNAMI,
  TORNADO,
  FAMINE,
  ROAD_ACCIDENT,
  UNKNOWN,
}

export interface DangerTypeParams {
  name: string,
  icon?: Icon
  color: string,
}

const getDangerTypeParams = (type: string): DangerTypeParams => {
  let realType: DangerType = DangerType[type as keyof typeof DangerType];
  switch(realType)  {
    case DangerType.BOMBING:
      return {
        name: 'Bombardowanie',
        color: 'black',
        icon: L.icon({
          iconUrl: BombingIcon,
          iconSize: [60, 60]
        }) 
      }
    case DangerType.TERRORIST_ATTACK:
      return {
        name: 'Atak terrorystyczny',
        color: 'red',
        icon: L.icon({
          iconUrl: TerroristsIcon,
          iconSize: [50, 50]
        }) 
      }
    case DangerType.EARTHQUAKE:
      return {
        name: 'Trzęsienie ziemi',
        color: 'blue',
        icon: L.icon({
          iconUrl: EarthquakeIcon,
          iconSize: [60, 60]
        }) 
      }
    case DangerType.FAMINE:
      return {
        name: 'Głód',
        color: 'purple',
        icon: L.icon({
          iconUrl: EarthquakeIcon, //TODO: CHANGE IT
          iconSize: [60, 60]
        }) 
      }
    case DangerType.ROAD_ACCIDENT:
      return {
        name: 'Wypadek drogowy',
        color: 'yellow',
        icon: L.icon({
          iconUrl: AccidentIcon,
          iconSize: [60, 60]
        }) 
      }
    case DangerType.TORNADO:
      return {
        name: 'Tornado',
        color: 'gray',
        icon: L.icon({
          iconUrl: TornadoIcon,
          iconSize: [60, 60]
        }) 
      }
    case DangerType.TSUNAMI:
      return {
        name: 'Tsunami',
        color: 'cyan',
        icon: L.icon({
          iconUrl: TsunamiIcon,
          iconSize: [60, 60]
        }) 
      }
    default:
      return {
        name: 'Nieznany',
        color: 'red'
      }
  }
}

export default getDangerTypeParams;