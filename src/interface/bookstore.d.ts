import { Cover } from '@/interface/common';
import { CommandBase } from './command';

export interface ListModulesData {
  pageconfig: string;
}

export interface BookstoreBooks {
  m_id: number
  num: number
  m_name: string
  css_type: string
  content: BookstoreBook[]
}

export interface BookstoreBook {
  bid?: string
  catename?: string
  author?: string
  charnum?: string
  class_name?: string
  class2_name?: string
  classid?: string
  classid2?: string
  point_peoples?: string
  star: any
  display_star: any
  display_star_people: any
  juheclassname?: string
  juheid?: string
  lastmonth_salenum?: string
  total_hit?: string
  covered?: Cover
  shujia?: number
  intro?: string
  clickurl?: CommandBase
  title?: string
  avatar?: string
  shupin?: string
  spid?: string
}