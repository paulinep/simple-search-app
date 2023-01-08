export default function priceCheck(products, productPrices, productSold, soldPrice) {
    let count = 0
    let i =-1
    let j = 0
    let indexes = []
    while((i = products.indexOf(productSold[j], 0)) !== -1) {
        indexes.push(i);
        j++
    }
    indexes?.map((priceIndex, index) => {
        if (parseFloat(productPrices[priceIndex]) !== parseFloat(soldPrice[index])) {
            count ++
        }
    })
    return count
}