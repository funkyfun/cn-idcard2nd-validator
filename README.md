# cn-idno-validator 中国第二代身份证校验器

🇨🇳 中国第二代身份证校验器，依照国家标准 [GB 11643-1999](http://www.gb688.cn/bzgk/gb/newGbInfo?hcno=080D6FBF2BB468F9007657F26D60013E)

## 使用

install:
```
npm install cn-idno-validator
```

CommonJS:
```js
const validator = require('cn-idno-validator');

const rs = validator.isValid('xxxxxxxxxxxxxxxxxx');
```

ES Module:
```js
import { isValid } from 'cn-idno-validator';

const rs = isValid('xxxxxxxxxxxxxxxxxx');
```

CDN:
```html
<script src="pathto/dist/index.umd.jd"></script>
<script>
    var rs = CnIdNoValidator.isValid('xxxxxxxxxxxxxxxxxx');
</script>
```

## 注意

只支持18位第二代身份证，目前只做宽松校验，第二代身份证第 18 是前 17 位数字计算得出的校验码，此规则可以校验大多数输入性错误，可用于用户输入时的规则校验，但不可用作身份证真实性校验依据。

- 第 18 位按标准计算校验
- 地区只校验了省级行政区，地级市行政区数据可能会
- 出生年份下限为 1850，无上限
- 出生日期未按具体月份校验（TODO），月份为 1\~12，日期为 1\~31

## License

MIT
