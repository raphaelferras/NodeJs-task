const { calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add } = require('../src/math.js')

test('Should Calculate total with tip', () => {
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test('Should Calculate total with tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('fahrenheitToCelsius function test', () => {
    const total = fahrenheitToCelsius(32)
    expect(total).toBe(0)
})

test('celsiusToFahrenheit function test', () => {
    const total = celsiusToFahrenheit(0)
    expect(total).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })


// test('should add two numbers', (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(5)
//         done()
//     })
// })

// test('should add two numbers', async () => {
//     const sum = await add(12, 13)
//     expect(sum).toBe(25)
// })