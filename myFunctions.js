$(function () {
    $('.select-btn').click(function () {
        const bookTitle = $(this).data('title');
        const bookPrice = $(this).data('price');
        const bookDetails = `${bookTitle} - ${bookPrice}`;

      
        $('#selected-book-details').text(bookDetails);

        const formSection = $('#form-container');
        formSection.show(); // إظهار النموذج
    });


    $('.details-btn').click(function () {
        const detailsRow = $(this).closest('tr').next('.details-row');
        detailsRow.toggleClass('show');
    });

   
    $('#order-form').on('submit', function (event) {
        event.preventDefault();

      
        const name = $('#full-name').val();
        const nationalId = $('#national-id').val();
        const birthDate = $('#birth-date').val();
        const phone = $('#phone').val();
        const email = $('#email').val();

      
        if (!isValidNationalId(nationalId)) {
            alert('الرقم الوطني غير صحيح. يجب أن يتألف من 11 رقمًا ويبدأ بـ 01 إلى 14.');
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

        
        alert('تم تقديم الطلب بنجاح!');
        $(this)[0].reset();
        $('#form-container').hide(); // إخفاء النموذج بعد الإرسال
    });

    
    function isValidNationalId(id) {
        const idPattern = /^(0[1-9]|1[0-4])\d{9}$/;
        return idPattern.test(id);
    }

 
    function isValidArabicName(name) {
        const namePattern = /^[\u0621-\u064A ]+$/; // يشمل الحروف العربية والمسافات فقط
        return namePattern.test(name);
    }


    function isValidBirthDate(date) {
        const today = new Date();
        const enteredDate = new Date(date);
        return enteredDate <= today; // التاريخ يجب أن يكون في الماضي أو اليوم
    }

  
    function isValidSyrianPhone(phone) {
        const phonePattern = /^(09[1-8])\d{7}$/; // يبدأ بـ 09 متبوعًا برقم بين 1-8
        return phonePattern.test(phone);
    }

    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
