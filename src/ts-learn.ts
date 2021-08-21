// 类型注解
var bb:string;
// bb = 3 no okay
bb = 'ddd'
// 类型推断
var bool = true;
// bool = 1 no okay
//  常见的类型 number string boolean undefined null

// 类型数组
let arr1: string[];
arr1 = ['1','3']
let arr2: Array<string>;
arr2 = ['4', '5']
let arrAny1: any[];
arrAny1 = [3,'b']


// 函数中的类型约束
function ss(arg:string):void{
    console.log('dd');
}
ss('3')
// 类型别名
type FooBar = {foo:number,bar:string};
let obj: FooBar;
obj = {foo:2,bar:'3'}

interface BarFoo {
    foo:number,
    bar:string
}
// 联合类型
let str: string | number;
str = 3;
str = '3'
// 交叉类型
type a = {first:number}
type b = {seconde:string}
type c = a & b;
// 函数
// 形参一旦声明就必须传递
// 可选参数加问号？
function anonymous (a:string, b?:number):string{
    return 'func'+ a;
}
anonymous('zj')
// 重载
// 根据参数的数量或类型不同，区别使用
// 先声明在实现
// 重载1
function watch1(cb1: ()=>void):void;
// 重载2
function watch1(cb1: ()=>void,cb2:()=>void):void;
function watch1(cb1: ()=>void,cb2?:()=>void):void{
    if(cb2){
        console.log('重载2');
        
    }else{
        console.log('重载1');
        
    }
}
watch1(function(){})

// class 
class parentClass{
    private _foo = 'foo' //私有属性不能在外部访问
    protected bar = 'bar' //受保护的属性 可在子类访问
    constructor(public baz:string){}

    get foo(){
        return this._foo
    }
    set foo(v){
        this._foo = v
    }
}

interface Res<T> {
    status: 1 | 0,
    data: T[]
}
function response<T>(data:T[]):Res<T>{
    return {
        status: 1,
        data
    }
}
response<string>(['dd'])

// 装饰器：工厂函数
// 类装饰器
function log(fn:any){
    return function (target:any){
        // target 就是ress
        console.log(typeof target);
        target.prototype.log = function(){
            // console.log(this.baz);
            fn(this.baz)
        }
    }
}
// 方法装饰器：区别是参数数量和类型
// target类实例，name：方法名，最后的是描述符
function setVal(target:any,name:string,decorator:any) {
    const setBaz = decorator.value;
    decorator.value = function (v:string) {
        console.log(this.baz);
        
        // 原先功能
        setBaz.call(this,v)
        console.log(this.baz);
    }
}
@log(window.confirm)
class ress {
    baz:string = 'baz';
    @setVal
    setBaz(v:string){
        this.baz = v
    }
}
const ff1 = new ress()
// @ts-ignore
ff1.log()
ff1.setBaz('bazzzz')