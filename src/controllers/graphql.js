import schema from '../graphql/schema'
import {graphql} from 'graphql'

export async function get(ctx){
  const body = ctx.request.body
  const { query, params } = Object.assign({}, body, ctx.query)
  if(query && query.includes('mutation')){
    ctx.status = 406
    ctx.body = 'GraphQL mutation only allowed in POST request'
  }else {
    ctx.body = await graphql(schema, query, ctx, params)
  }
}

export async function post(ctx) {
  const body = ctx.request.body
  const { query, params } = Object.assign({}, body, ctx.query)
  ctx.body = await graphql(schema, query, ctx, params)
}
