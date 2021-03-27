/**
 * 身份证号码长度（第二代）
 */
const NewStyleLenth = 18;

/**
 * 身份证号码切片，不同含义部分
 */
interface IdSliceObj {
    /** 本体码 */
    masterNumber: string;
    /** 地区码 */
    addrNumber: string;
    /** 生日码 */
    birthNumber: string;
    /** 出生顺序码 */
    orderNumber: string;
    /** 校验码 */
    checkNumber: string;
}

/**
 * 将身份证号码不同含义部分切片
 * @param id 身份证号码
 * @returns
 */
function idSlice(id: string): IdSliceObj {
    const masterNumber = id.slice(0, 17);
    const addrNumber = id.slice(0, 6);
    const birthNumber = id.slice(6, 14);
    const orderNumber = masterNumber.slice(-3);
    const checkNumber = id.slice(-1).toUpperCase();
    return {
        masterNumber,
        addrNumber,
        birthNumber,
        orderNumber,
        checkNumber,
    };
}

/**
 * 简单校验位数
 * @param id
 */
function preCheck(id: string) {
    if (!id || typeof id !== 'string') return false;
    return id.length === NewStyleLenth;
}
/**
 * 省级行政区地址码
 * @returns
 */
const getProvinceNumberArr = () => [
    /** 北京 */ '11',
    /** 天津市 */ '12',
    /** 河北省 */ '13',
    /** 山西省 */ '14',
    /** 内蒙古自治区 */ '15',
    /** 辽宁省 */ '21',
    /** 吉林省 */ '22',
    /** 黑龙江省 */ '23',
    /** 上海市 */ '31',
    /** 江苏省 */ '32',
    /** 浙江省 */ '33',
    /** 安徽省 */ '34',
    /** 福建省 */ '35',
    /** 江西省 */ '36',
    /** 山东省 */ '37',
    /** 河南省 */ '41',
    /** 湖北省 */ '42',
    /** 湖南省 */ '43',
    /** 广东省 */ '44',
    /** 广西壮族自治区 */ '45',
    /** 海南省 */ '46',
    /** 重庆市 */ '50',
    /** 四川省 */ '51',
    /** 贵州省 */ '52',
    /** 云南省 */ '53',
    /** 西藏自治区 */ '54',
    /** 陕西省 */ '61',
    /** 甘肃省 */ '62',
    /** 青海省 */ '63',
    /** 宁夏回族自治区 */ '64',
    /** 新疆维吾尔自治区 */ '65',
    /** 台湾省 */ '71',
    /** 香港特别行政区 */ '81',
    /** 澳门特别行政区 */ '82',
];
/**
 * 校验地址码
 * 目前只校验省级行政区，地级行政区数据变化不可控
 * @param addrNumber
 * @returns
 */
function checkAddrNumber(addrNumber: string) {
    const proviceNumber = addrNumber.slice(0, 2);
    return getProvinceNumberArr().includes(proviceNumber);
}

/**
 * 校验生日码
 * @param birthNumber 生日码
 * @returns
 */
function checkBirthNumber(birthNumber: string) {
    if (birthNumber.length !== 8) return false;

    const year = parseInt(birthNumber.slice(0, 4), 10);

    // FixMe 粗略校验，不会出现低于这个年份的人
    if (year < 1850) return false;

    const month = parseInt(birthNumber.slice(4, 6), 10);
    const day = parseInt(birthNumber.slice(-2), 10);

    // FixMe 粗略校验，未考虑闰年月份等
    if (month > 12 || month === 0 || day > 31 || day === 0) {
        return false;
    }

    return true;
}

/**
 * 加权因子算法
 * @param t 位置
 * @returns
 */
// function weight(t: number): number {
//     return Math.pow(2, t - 1) % 11;
// }

/**
 * 获取加权因子
 */
const getPosWeight: () => number[] = () => [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

/**
 * 获取校验码
 */
const getCheckNumberArr: () => string[] = () => [
    '1',
    '0',
    'X',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
];

/**
 * 根据本体码计算出校验码
 * @param masterNumber 本体码
 * @returns
 */
function calcCheckNumber(masterNumber: string) {
    const masterNumArr = masterNumber.split('');
    const masterWeightSum = getPosWeight().reduce((prev, current, i) => {
        return (prev += parseInt(masterNumArr[i], 10) * current);
    }, 0);
    return getCheckNumberArr()[masterWeightSum % 11];
}

export function isValid(id: string) {
    const isPreCheck = preCheck(id);
    if (!isPreCheck) return false;
    // 将身份证号码不同含义的字段提取出来
    const { birthNumber, addrNumber, masterNumber, checkNumber } = idSlice(id);

    const isBirthCheck = checkBirthNumber(birthNumber);
    if (!isBirthCheck) return false;

    const isAddrCheck = checkAddrNumber(addrNumber);
    if (!isAddrCheck) return false;

    //得出校验码
    const calcCheckNumberResult = calcCheckNumber(masterNumber);

    return calcCheckNumberResult === checkNumber;
}
