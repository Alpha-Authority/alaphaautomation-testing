require('dotenv').config()

function execute(args) {
    const contentyes = []
    const arb = []
    const arbBuilder = []
    setTimeout(function timer2() {
        args.forEach(doThis);
        function doThis(value, index, array) {
            if (value.Type == 'embed'){
                contentyes.push(embed = value.Data)
            }
            if (value.Type == 'actionrowbuilder') {
                value.Data.forEach(doThisNext)
                function doThisNext(nextValue, nextIndex, nextArray) {
                    if (nextValue.type == 2) {
                        nextValue.components.forEach(afterNextValue)
                        function afterNextValue(afterNextValue, afterNextIndex, afterNextArray) {
                            arbBuilder.push({type: afterNextValue.type, label: afterNextValue.label, style: afterNextValue.style, custom_id: afterNextValue.custom_id})
                            if (afterNextIndex == nextValue.components.length) {
                                
                                console.log(arbBuilder)
                                
                            }
                        }
                        setTimeout(function timer() {
                        arb.push({type: nextValue.type, components: arbBuilder})
                        console.log(arb)
                        }, 100)
                    }
                }
            }
        }
    });
    setTimeout(function timer() {
        //contentyes.push(arb)
        contentyes.push(components = arb)
        setTimeout(function timer() {
            console.log(contentyes)
            console.log(arbBuilder)
            //return contentyes
        
        }, 200);
     }, 200);
    // contentyes.push(arb)
    // return contentyes
    console.log(contentyes)
    return contentyes
};

module.exports = execute;