const outputs = '../pipeline/outputs'
import Report from '../../components/Report'
import {Result} from '../../types'

export async function getStaticPaths() {
  const report = process.env.REPORT
  if (report && report.length) {
    return {paths: [], fallback: false}
  }
  const fs = await import('fs')
  const subfolders = fs.readdirSync(outputs, {withFileTypes: true})
    .map((x: any) => x.name)
    .filter((x: string) => !x.startsWith('.'))
  return {paths: subfolders.map((name: string) => ({params: {name}})), fallback: false}
}

export async function getStaticProps({params}: any) {
  const fs = await import('fs')
  const result = fs.readFileSync(`../pipeline/outputs/${params.name}/result.json`, 'utf8')
  return {props: {name: params.name, result: JSON.parse(result)}}
}

export default function Page({result}: { name: string, result: Result }) {
  return <Report {...result} />
}
