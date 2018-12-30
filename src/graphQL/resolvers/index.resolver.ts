import autobind from 'autobind-decorator'

@autobind
export class IndexResolvers {


    private hello(obj: any, args: any, ctx: any): string {
        console.log(args);
        return `Hello, ${args.name ? args.name : 'World'}! :)`
    }
    private bye(obj: any, args: any, ctx: any): string {
        return `Bye ${args.name ? args.name : 'World!'}`
    }

    private test(obj: any, args: any, ctx: any): string {
        return 'TEST! WORKS!'
    }

    get resolvers() {


        return {
            Query: {
                hello: this.hello,
                bye: this.bye,
                test: this.test
            }
        }
    }

}


export default new IndexResolvers().resolvers