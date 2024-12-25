$(function () {
    // التحكم في إظهار وإخفاء النموذج عند اختيار كتاب
    $('.select-btn').click(function () {
        const bookTitle = $(this).data('title');
        const bookPrice = $(this).data('price');
        const bookDetails = `${bookTitle} - ${bookPrice}`;

        // تحديث تفاصيل الكتاب وعرض النموذج
        $('#selected-book-details').text(bookDetails);

        const formSection = $('#form-container');
        formSection.toggle(); // التبديل بين الإظهار والإخفاء
    });

    // عند إرسال النموذج
    $('#order-form').on('submit', function (event) {
        event.preventDefault();

        // استرجاع القيم المدخلة
        const name = $('#full-name').val();
        const nationalId = $('#national-id').val();
        const birthDate = $('#birth-date').val();
        const phone = $('#phone').val();
        const email = $('#email').val();

        // التحقق من الحقول المختلفة
        if (!isValidNationalId(nationalId)) {
            alert(' الرقم الوطني غير صحيح. يجب أن يتألف من 11 رقمً  ');
            return;
        }

        if (name && !isValidArabicName(name)) {
            alert('يرجى إدخال الاسم باللغة العربية فقط.');
            return;
        }

        if (birthDate && !isValidBirthDate(birthDate)) {
            alert('تاريخ الميلاد غير صالح.');
            return;
        }

        if (phone && !isValidSyrianPhone(phone)) {
            alert('رقم الموبايل يجب أن يكون صالحًا ويخص شبكات سيرياتيل أو MTN.');
            return;
        }

        if (email && !isValidEmail(email)) {
            alert('يرجى إدخال بريد إلكتروني صالح.');
            return;
        }

        // عرض رسالة النجاح
        alert('تم تقديم الطلب بنجاح!');
        $(this)[0].reset();
        $('#form-container').hide(); // إخفاء النموذج بعد الإرسال
    });

    // التحقق من الرقم الوطني
    function isValidNationalId(id) {
        const idPattern = /^(0[1-9]|1[0-4])\d{9}$/;
        return idPattern.test(id);
    }

    // التحقق من الاسم العربي
    function isValidArabicName(name) {
        const namePattern = /^[\u0621-\u064A ]+$/; // يشمل الحروف العربية والمسافات فقط
        return namePattern.test(name);
    }

    // التحقق من تاريخ الميلاد
    function isValidBirthDate(date) {
        const today = new Date();
        const enteredDate = new Date(date);
        return enteredDate <= today; // التاريخ يجب أن يكون في الماضي أو اليوم
    }

    // التحقق من رقم الموبايل السوري
    function isValidSyrianPhone(phone) {
        const phonePattern = /^(09[1-8])\d{7}$/; // يبدأ بـ 09 متبوعًا برقم بين 1-8
        return phonePattern.test(phone);
    }

    // التحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
