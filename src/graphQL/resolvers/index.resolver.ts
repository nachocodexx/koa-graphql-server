import autobind from 'autobind-decorator'

@autobind
export class IndexResolvers {


    private hello(obj: any, args: any, ctx: any): string {
        return `Hello, ${args.name ? args.name : 'World'}! :)`
    }
    private bye(obj: any, args: any, ctx: any): string {
        return `Bye ${args.name ? args.name : 'World!'}`
    }



    get resolvers() {


        return {
            Query: {
                hello: this.hello,
                bye: this.bye,
            }
        }
    }

}


export default new IndexResolvers().resolvers