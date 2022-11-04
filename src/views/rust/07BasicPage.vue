<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-11-03 15:40:14
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-04 17:14:53
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-07-wrapper article-wrapper">
        <h2 class="project__title article-title">trait</h2>
        <p>
            特设多态包括运算符重载，是指同一种行为有很多不同的实现；而把子类型当成父类型使用，比如Cat当成Animal使用，属于子类型多态。
        </p>
        <h3 class="project__title">trait</h3>
        <p>
            trait是Rust中的接口，它定义了类型使用这个接口的行为。你可以类比到自己熟悉的语言中理解，trait对于Rust而言，相当于interface于Java、protocol之于Swift、type
            class之于Haskell。
        </p>
        <h3 class="project__title">基于trait</h3>
        <p>如std::io::Write的定义。</p>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            这些方法也被称作关联函数（associate function）。在trait中，方法可以有缺省的实现，对于这个Write
            trait，只需要实现write和flush两个方法，其他都有缺省实现。如果将trait类比为父类，实现trait的类型比为子类，那么缺省实现的方法就相当于子类中可以重载但不是必须重载的方法。
        </p>
        <p>Self代表当前的类型，比如File类型实现了Write，那么实现过程中使用到的Self就指代File。</p>
        <p>
            self在用作方法的第一个参数时，实际上是self:Self的简写，所以&self是self:&Self,而&mut self是self:&mut Self。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>
            从代码中，实现了write和flush方法，其他方法都用缺省实现，这样BufBuilder对Write
            trait的实现是完整的。如果没有实现write或者flush，Rust编译器会报错，你可以自己尝试一下。数据结构一旦实现了某个trait，那么这个trait内部的方法都可以被使用，比如这里我们调用了buf.write_all()。write_all接受两个参数：&mut
            self和&[u8]，第一个参数传递的是buf这个变量的可变引用，第二个参数传递的是b"Hello world!"。
        </p>
        <h3 class="project__title">trait练习</h3>
        <p class="article-tips">字符串的解析器，将字符串解析成自己希望的类型。</p>
        <p>定义trait，有一个方法接受字符串引用，返回Self(ps:应该就是定义trait返回自己定义类型的值)</p>
        <highlightjs lang="rust" :code="demo3" />
        <p>所以之前说的缺省实现应该就是trait未定义的函数，而trait定义的函数如parse就是非缺省实现。</p>
        <p>实现一个字符串将包含数字的字符串转换成数字</p>
        <highlightjs lang="rust" :code="demo4" />
        <p>实现字符串包含浮点型的字符串转换成浮点型f64</p>
        <highlightjs lang="rust" :code="demo5" />
        <p>
            除了类型和用于捕获的regex略有变化外，整个代码基本和上面的代码是重复的。在实现trait的时候，也可以用泛型参数来实现trait，需要注意的是，要对泛型参数做一定的限制。
        </p>
        <ul>
            <li>
                第一，不是任何类型都可以通过字符串解析出来，在例子中，我们只能处理数字类型，并且这个类型还要能够被str::parse处理。
            </li>
            <li>
                第二，上面代码当无法正确解析字符串的时候，会直接返回0，表示无法处理，但我们使用泛型参数后，无法返回0，因为0不一定是某个符合泛型参数的类型中的一个值。
            </li>
        </ul>
        <p>
            str::parse是一个泛型函数，它返回任何实现了FromStr
            trait的类型，所以这里对泛型参数的第一个限制是，它必须实现了FromStr trait。
        </p>
        <p>
            其实返回0的目的是为处理不了的情况，返回一个缺省值，在Rust标准库中有Default
            trait，绝大多数类型都实现了这个trait，来为数据结构提供缺省值，所以泛型参数的另一个限制是Default。
        </p>
        <highlightjs lang="rust" :code="demo6" />
        <p>
            通过对带有约束的泛型参数实现trait，一份代码就实现了u32/f64等类型的Parse
            trait，非常精简。但是这里返回缺省值的话，会跟解析“0abcd”这样的情况混淆，不知道解析出的0，究竟是出错了，还是本该解析出0。
        </p>
        <p>所以更好的方式是 parse 函数返回一个 Result</p>
        <highlightjs lang="rust" :code="demo7" />
        <p>
            这里Result的E让人犯难了：要返回的错误信息，在trait定义时并不确定，不同的实现者可以使用不同的错误类型，这里trait的定义者最好能够把这种灵活性留给trait的实现者。
        </p>
        <h3 class="project__title">带关联类型的 trait</h3>
        <p>Rust允许trait内部包含关联类型，实现时跟关联函数一样，它也需要实现关联类型。</p>
        <highlightjs lang="rust" :code="demo8" />
        <highlightjs lang="rust" :code="demo9" />
        <p>
            这种带有关联类型的trait比普通trait更加灵活，抽象度更高。trait方法的参数或者返回值，都可以用关联类型来表述，而在实现有关联类型的trait时，只需要额外提供关联类型的具体类型就可以了。
        </p>
        <h3 class="project__title">支持泛型的trait</h3>
        <p class="article-tips">trait 的定义是不是也可以支持泛型呢？</p>
        <p>
            定义一个Contact
            trait允许数据结构拼接起来，希望String和String、&str、可转换为String的数据进行拼接。如std::ops::Add这个提供加法运算的trait
        </p>
        <highlightjs lang="rust" :code="demo10" />
        <p>
            这个trait有一个泛型参数Rhs，代表的加号右边的值，用于add方法的第二个参数位。这个Rhs默认的是Self，也就是使用的Add
            trait，如果不提供泛型参数，那么加号右值和左值都要是相同的类型。
        </p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import data from '@/data/rust/07BasicData';

export default defineComponent({
    name: '07BasicPage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style lang="scss" scoped></style>
