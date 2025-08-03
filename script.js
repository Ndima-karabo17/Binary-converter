document.addEventListener('DOMContentLoaded', () => {
    const decimalInput = document.getElementById('decimalNumber');
    const binaryInput = document.getElementById('binaryNumber');
    const complementInput = document.getElementById('compNum');
    const bitsInput = document.getElementById('bits');

    let isUpdating = false;

    function padBinary(bin, bits) {
        return bin.padStart(bits, '0').slice(-bits);
    }

    function toTwosComplement(bin, bits) {
        let inverted = bin.split('').map(b => b === '0' ? '1' : '0').join('');
        let incremented = (parseInt(inverted, 2) + 1).toString(2);
        return padBinary(incremented, bits);
    }

    function updateFromDecimal() {
        if (isUpdating) return;
        isUpdating = true;

        const bits = parseInt(bitsInput.value);
        const decimal = parseInt(decimalInput.value);

        if (isNaN(decimal) || isNaN(bits) || bits <= 0) {
            binaryInput.value = '';
            complementInput.value = '';
            isUpdating = false;
            return;
        }

        const max = Math.pow(2, bits - 1) - 1;
        const min = -Math.pow(2, bits - 1);

        if (decimal > max || decimal < min) {
            alert(`Out of range for ${bits} bits. Must be between ${min} and ${max}.`);
            isUpdating = false;
            return;
        }

        let binary;
        if (decimal >= 0) {
            binary = padBinary(decimal.toString(2), bits);
        } else {
            binary = padBinary((Math.pow(2, bits) + decimal).toString(2), bits);
        }

        binaryInput.value = binary;
        complementInput.value = toTwosComplement(binary, bits);
        isUpdating = false;
    }

    function updateFromBinary() {
        if (isUpdating) return;
        isUpdating = true;

        const bits = parseInt(bitsInput.value);
        const binary = binaryInput.value;

        if (!/^[01]+$/.test(binary) || isNaN(bits) || bits <= 0) {
            decimalInput.value = '';
            complementInput.value = '';
            isUpdating = false;
            return;
        }

        const padded = padBinary(binary, bits);

        
        let decimal;
        if (padded[0] === '1') {
            decimal = parseInt(padded, 2) - Math.pow(2, bits);
        } else {
            decimal = parseInt(padded, 2);
        }

        decimalInput.value = decimal;
        complementInput.value = toTwosComplement(padded, bits);
        isUpdating = false;
    }

    decimalInput.addEventListener('input', updateFromDecimal);
    binaryInput.addEventListener('input', updateFromBinary);
    bitsInput.addEventListener('input', () => {
        updateFromDecimal();  // update both when bits change
    });
});
