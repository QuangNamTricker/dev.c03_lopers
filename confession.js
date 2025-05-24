
    const token = "7315329822:AAEfzCe8NSQM6yvWH0zwzJxsvKYMvHxYhHU";
    const chatId = "5674777894";

    function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    }

    document.getElementById("contactForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const name = this.name.value;
      const email = this.email.value;
      const message = this.message.value;

      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;

      const ipInfo = await fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .catch(() => ({ ip: "Không lấy được IP", city: "", region: "", country_name: "" }));

      const text = `📬 Góp ý mới từ web:\n👤 Tên: ${name}\n📧 Email: ${email}\n📝 Nội dung: ${message}\n🌐 IP: ${ipInfo.ip}\n📍 Vị trí: ${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country_name}\n🧠 Trình duyệt: ${userAgent}\n💻 Hệ điều hành: ${platform}\n🈯 Ngôn ngữ: ${language}`;

      document.getElementById("formStatus").textContent = "⏳ Đang gửi...";

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chat_id: chatId, text: text })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          document.getElementById("formStatus").textContent = "✅ Gửi thành công! Cảm ơn bạn 💖";
          this.reset();
        } else {
          document.getElementById("formStatus").textContent = "❌ Lỗi khi gửi. Thử lại sau!";
        }
      })
      .catch(err => {
        document.getElementById("formStatus").textContent = "⚠️ Không thể kết nối đến Telegram.";
      });
    });
