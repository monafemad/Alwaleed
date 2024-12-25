$(document).ready(function () {
    // عند النقر على زر اختيار كتاب
    $('.select-btn').on('click', function () {
        const bookTitle = $(this).data('title');
        const bookPrice = $(this).data('price');
        const selectedBookInfo = `${bookTitle} - ${bookPrice}`;

        // عرض النموذج مع تحديث النص الخاص بالكتاب
        $('#selected-book-info').text(selectedBookInfo);

        // التحقق إذا كان النموذج ظاهرًا، وإذا كان كذلك، إخفاءه
        if ($('#form-container').is(':visible')) {
            $('#form-container').slideUp(); // إخفاء النموذج
        } else {
            $('#form-container').slideDown(); // إظهار النموذج
        }
    });

    // عند إرسال نموذج الطلب
    $('#order-form').on('submit', function (event) {
        event.preventDefault();

        const nationalIdInput = $('#national-id').val();

        // التحقق من صحة الرقم الوطني
        if (!isValidNationalId(nationalIdInput)) {
            alert('الرجاء إدخال رقم وطني صحيح يتكون من 11 رقمًا، مع بداية صالحة.');
            return;
        }

        alert('تم إرسال الطلب بنجاح!');
        this.reset(); // إعادة تعيين النموذج
        $('#form-container').slideUp(); // إخفاء النموذج
    });

    // وظيفة التحقق من صحة الرقم الوطني
    function isValidNationalId(id) {
        // يجب أن يكون الرقم 11 خانة وأن تبدأ بأرقام بين 01 و14
        const pattern = /^(0[1-9]|1[0-4])\d{9}$/;
        return pattern.test(id);
    }
});
