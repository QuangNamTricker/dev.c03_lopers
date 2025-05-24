
    const token = "7315329822:AAEfzCe8NSQM6yvWH0zwzJxsvKYMvHxYhHU";
    const chatId = "5674777894";

    document.getElementById("lockForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const deviceName = form.deviceName.value;
      const username = form.username.value;
      const machineId = form.machineId.value;
      const lockTime = form.lockTime.value;
      const file = form.image.files[0];

      const message = `🚫 YÊU CẦU KHÓA MÁY\n🖥️ Tên Máy: ${deviceName}\n👤 User: ${username}\n🧬 Machine ID: ${machineId}\n⏰ Khoá đến: ${lockTime}`;
      const statusEl = document.getElementById("formStatus");
      statusEl.textContent = "Đang gửi dữ liệu...";

      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("photo", file);

        const imgRes = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: "POST",
          body: formData,
        });

        const data = await imgRes.json();
        if (data.ok) {
          statusEl.textContent = "✅ Gửi thành công!";
          form.reset();
        } else {
          statusEl.textContent = "❌ Gửi ảnh thất bại.";
        }
      } catch (err) {
        statusEl.textContent = "⚠️ Kết nối Telegram thất bại.";
      }
    });

    function showQR() {
      document.getElementById("qrBox").style.display = "block";
    }
