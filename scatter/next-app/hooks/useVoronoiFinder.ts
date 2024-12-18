import {useMemo} from 'react'
import {voronoi} from '@visx/voronoi'
import {Cluster, CommentsMap, Dimensions, Point} from '@/types'
import {Zoom} from './useZoom'

const useVoronoiFinder = (
  clusters: Cluster[],
  comments: CommentsMap,
  color: (cluster_id: string) => string,
  zoom: Zoom,
  dimensions?: Dimensions,
  onlyCluster?: string,
  radius = 30,
  filterKeyword?: string
) => {
  return useMemo(() => {
    if (!dimensions) return () => null as any
    const {width, height, scaleX, scaleY} = dimensions

    // キーワードでargumentsをフィルタリング
    const points: Point[] = clusters.flatMap((cluster) =>
      cluster.arguments
        .filter(({arg_id, x, y, argument}) => {
          // キーワードが存在する場合のみフィルタリングを適用
          if (filterKeyword == undefined || filterKeyword == '') return true
          return argument.includes(filterKeyword) // キーワードが含まれるか
        })
        .map((arg) => ({
          ...arg,
          ...cluster,
          ...comments[arg.comment_id],
          color: color(cluster.cluster_id),
        }))
    )
    const layout = voronoi<Point>({
      x: (d) => scaleX(d.x),
      y: (d) => scaleY(d.y),
      width,
      height,
    })(points)
    return (mouseEvent: any) => {
      // FIXME mouseEvent 以外が渡されることがある
      const rect = mouseEvent.target?.getBoundingClientRect!() || {left: 0, top: 0} // FIXME
      const x = zoom.unZoomX(mouseEvent.clientX - rect.left)
      const y = zoom.unZoomY(mouseEvent.clientY - rect.top)
      const found = layout.find(x, y, radius)
      if (onlyCluster && found && found.data.cluster_id !== onlyCluster)
        return null
      return found
    }
  }, [clusters, dimensions])
}

export default useVoronoiFinder
