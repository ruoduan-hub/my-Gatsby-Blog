import React, { useEffect, useRef } from "react";

function Fireworks() {
  const canvasRef = useRef(null);
  const fireworks = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas(); // 初始化画布大小
    window.addEventListener("resize", resizeCanvas); // 监听窗口大小变化

    // 创建烟花对象
    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.gravity = 0.02;
        this.opacity = 1;
        this.color = getRandomColor();

        // 创建烟花粒子
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 2;
          const size = 2; // 固定烟花粒子的大小
          const particle = {
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            opacity: 1,
            size: size
          };
          this.particles.push(particle);
        }
      }

      // 更新烟花粒子位置
      update() {
        for (let i = 0; i < this.particles.length; i++) {
          const particle = this.particles[i];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += this.gravity;
          particle.opacity -= 0.01;

          // 绘制烟花粒子
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();
        }
      }
    }

    // 生成随机颜色
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // 创建烟花并添加到数组中
    function createFirework(x, y) {
      const firework = new Firework(x, y);
      fireworks.push(firework);
    }

    // 更新画布
    function updateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();

        if (fireworks[i].particles[0].opacity <= 0) {
          fireworks.splice(i, 1);
        }
      }

      requestAnimationFrame(updateCanvas);
    }

    // 监听鼠标移动事件
    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const offsetX = rect.left;
      const offsetY = rect.top;

      const mouseX = event.clientX - offsetX;
      const mouseY = event.clientY - offsetY;

      createFirework(mouseX, mouseY);
    }

    // 绑定鼠标事件
    canvas.addEventListener("mousemove", handleMouseMove);

    // 开始动画
    updateCanvas();

    // 清理工作
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas style={{ width: '100%', height: '100%', position: 'absolute' }} ref={canvasRef} />;
}

export default Fireworks;
