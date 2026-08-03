import Meelopen, { meta as meelopenMeta } from './meelopen-op-de-werkvloer.mdx'
import Bezwaarproces, { meta as bezwaarprocesMeta } from './bezwaarproces-in-cijfers.mdx'
import Warehouse, { meta as warehouseMeta } from './open-data-warehouse-met-dbt.mdx'
import Rag, { meta as ragMeta } from './rag-voor-beleidsstukken.mdx'
import Scrum, { meta as scrumMeta } from './scrum-in-de-publieke-sector.mdx'
import Requirements, { meta as requirementsMeta } from './requirements-engineering-voor-dataproducten.mdx'
import Feestdagen, { meta as feestdagenMeta } from './nederlandse-feestdagen-in-sql.mdx'

export const posts = [
  { ...feestdagenMeta, Component: Feestdagen },
  { ...bezwaarprocesMeta, Component: Bezwaarproces },
  { ...warehouseMeta, Component: Warehouse },
  { ...ragMeta, Component: Rag },
  { ...scrumMeta, Component: Scrum },
  { ...requirementsMeta, Component: Requirements },
  { ...meelopenMeta, Component: Meelopen },
]

export function findPost(slug) {
  return posts.find((p) => p.slug === slug)
}
