# CUSTOM DIALOG BOX FONT SETUP GUIDE

## 🚨 ÖNEMLİ: Custom Dialog Box Font Ayarları

### 1. CSS'de @font-face Tanımları
```css
/* styles.css dosyasında */
@font-face {
    font-family: 'BBManualMonoRegular';
    src: url('BB Manual Mono (Pro) Original Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'BBManualMonoSemiBold';
    src: url('BB Manual Mono (Pro) Original Semi Bold.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
}
```

### 2. Scene Dosyalarında Font Kullanımı
```javascript
// scenes/scene1.js dosyasında
customDialog: {
    style: {
        // Dialog box genel stilleri (font ayarları YOK)
    },
    questionStyle: {
        fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
        fontSize: 'calc(20px * var(--window-scale, 1))',
        fontWeight: 400,
        color: 'black',
        textAlign: 'center',
        marginBottom: 'calc(10px * var(--window-scale, 1))',
        lineHeight: '1.2'
    },
    buttonStyle: {
        fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
        fontSize: 'calc(16px * var(--window-scale, 1))',
        fontWeight: 600,
        // ... diğer buton stilleri
    }
}
```

### 3. Font Değişikliği Yaparken Kontrol Listesi

#### ✅ Yapılması Gerekenler:
1. **CSS'de @font-face tanımla** (styles.css)
2. **Scene'de `questionStyle` ve `buttonStyle` güncelle** (scenes/scene1.js)
3. **fontWeight ayarla** (400=normal, 600=kalın)
4. **Fallback fontlar ekle** (Arial, sans-serif)
5. **Ctrl+F5 ile hard refresh yap**

#### ❌ Yapılmaması Gerekenler:
1. **CSS'te custom dialog için font boyutu tanımlama**
2. **Scene'de `style` içine font ayarları koyma**
3. **Fallback fontları unutma**
4. **fontWeight'ı unutma**

### 4. Test Etme Adımları
1. Ctrl+F5 ile hard refresh
2. Scene1'e git
3. Custom dialog box'taki soru yazısını kontrol et
4. Custom dialog box'taki buton yazılarını kontrol et
5. Font boyutlarının değişip değişmediğini test et

### 5. Sorun Giderme
- **Font değişmiyor:** CSS'de @font-face var mı?
- **Font değişmiyor:** Scene'de `questionStyle` ve `buttonStyle` doğru mu?
- **Font değişmiyor:** fontWeight ayarlanmış mı?
- **Font değişmiyor:** Fallback fontlar var mı?
- **Font boyutu değişmiyor:** CSS'te hardcoded font-size var mı?

### 6. 🚨 ÖNEMLİ: CSS Override Sorunu
**EN YAYGIN HATA:** CSS'te custom dialog için font boyutları var ve JavaScript'teki ayarları override ediyor!

#### Kontrol Edilecek CSS Dosyaları:
```css
/* styles.css dosyasında bu stilleri KONTROL ET ve KALDIR */
.custom-dialog {
    font-size: clamp(18px, 2.5vw, 32px);  /* ❌ Bu override eder */
}

.custom-dialog .dialog-question {
    font-size: clamp(16px, 2.5vw, 32px);  /* ❌ Bu override eder */
}

.custom-dialog-button {
    font-size: clamp(16px, 1.8vw, 24px);  /* ❌ Bu override eder */
}
```

#### Çözüm:
1. **CSS'teki font boyutlarını KALDIR**
2. **JavaScript'teki font ayarlarıyla çalış**
3. **Ctrl+F5 ile hard refresh yap**

### 7. Responsive Font Boyutları
```javascript
// ✅ Responsive font boyutu
fontSize: 'calc(20px * var(--window-scale, 1))'  // Soru için
fontSize: 'calc(16px * var(--window-scale, 1))'  // Butonlar için
```

### 8. Font Dosya Yolları
- Font dosyaları proje klasöründe olmalı
- CSS'de doğru dosya adı kullanılmalı
- Dosya uzantısı doğru olmalı (.otf, .ttf, .woff)

### 9. 🚨 DIALOG BOX BOYUT SORUNU ÇÖZÜMÜ

#### Sorun:
Dialog box başlangıçta küçük olup büyüyordu çünkü:
1. **CSS transition'ları** boyut değişimine sebep oluyordu
2. **Font loading** fallback font'tan özel font'a geçiş yapıyordu
3. **Image loading** container boyutunu değiştiriyordu
4. **Display değişimi** (`none` → `block`) reflow yapıyordu

#### Çözüm:
1. **CSS'te transition'ları kapat:**
```css
.custom-dialog {
    transition: none !important;
}
.custom-dialog-button {
    transition: none !important;
}
```

2. **JavaScript'te transition'ları kapat:**
```javascript
Object.assign(dialog.style, {
    transition: 'none',
    // ... diğer stiller
});
```

3. **Font loading'i bekle:**
```javascript
document.fonts.ready.then(() => {
    // Dialog'u göster
});
```

4. **Image loading'i bekle:**
```javascript
sceneImage.onload = () => {
    // Dialog'u göster
};
```

5. **Dialog'u direkt görünür başlat:**
```html
<!-- ÖNCE: display: none -->
<!-- ŞİMDİ: display: flex -->
<div class="custom-dialog" style="display: flex;">
```

#### Sonuç:
- ✅ Dialog box direkt doğru boyutta başlıyor
- ✅ Hiç boyut değiştirmiyor
- ✅ Font ve image loading'den etkilenmiyor

### 10. 🚨 SORU TEXTİ FONT BOYUTU SORUNU ÇÖZÜMÜ

#### Sorun:
Buton texti font boyutu değişiyordu ama soru texti değişmiyordu çünkü:
1. **CSS override:** CSS'te hardcoded font boyutları JavaScript'i override ediyordu
2. **Eksik konfigürasyon:** Soru texti için ayrı `questionStyle` konfigürasyonu yoktu
3. **Eksik JavaScript:** İkinci `applyCustomDialogStyles` fonksiyonunda soru texti ayarları yoktu

#### Çözüm:
1. **CSS'teki font boyutlarını kaldır:**
```css
/* ÖNCE: */
.custom-dialog { font-size: clamp(18px, 2.5vw, 32px); }
.custom-dialog .dialog-question { font-size: clamp(16px, 2.5vw, 32px); }
.custom-dialog-button { font-size: clamp(16px, 1.8vw, 24px); }

/* ŞİMDİ: */
/* Font boyutları kaldırıldı, JavaScript'teki ayarlar geçerli */
```

2. **Scene'de ayrı `questionStyle` konfigürasyonu ekle:**
```javascript
// scenes/scene1.js
customDialog: {
    style: {
        // Dialog box genel stilleri (font ayarları YOK)
    },
    questionStyle: {
        fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
        fontSize: 'calc(20px * var(--window-scale, 1))',
        fontWeight: 400,
        color: 'black',
        textAlign: 'center',
        marginBottom: 'calc(10px * var(--window-scale, 1))',
        lineHeight: '1.2'
    },
    buttonStyle: {
        // Buton stilleri
    }
}
```

3. **JavaScript'te soru texti için font ayarları ekle:**
```javascript
// Her iki applyCustomDialogStyles fonksiyonuna ekle
const questionElement = dialog.querySelector('.dialog-question');
if (questionElement && dialogConfig.questionStyle) {
    Object.assign(questionElement.style, dialogConfig.questionStyle);
}
```

#### Sonuç:
- ✅ Soru texti font boyutu değişiyor
- ✅ Buton texti font boyutu değişiyor
- ✅ Her ikisi de JavaScript'teki ayarlara göre çalışıyor

### 11. Örnek Doğru Kullanım
```javascript
// ✅ DOĞRU
customDialog: {
    style: {
        // Dialog box genel stilleri (font ayarları YOK)
        background: '#dcdcdc',
        border: 'calc(3px * var(--window-scale, 1)) solid black',
        padding: 'calc(25px * var(--window-scale, 1)) calc(30px * var(--window-scale, 1))',
        // ... diğer stiller
    },
    questionStyle: {
        fontFamily: 'BBManualMonoRegular, Arial, sans-serif',
        fontSize: 'calc(20px * var(--window-scale, 1))',
        fontWeight: 400,
        color: 'black',
        textAlign: 'center',
        marginBottom: 'calc(10px * var(--window-scale, 1))',
        lineHeight: '1.2'
    },
    buttonStyle: {
        fontFamily: 'BBManualMonoSemiBold, Arial, sans-serif',
        fontSize: 'calc(16px * var(--window-scale, 1))',
        fontWeight: 600,
        background: '#b3b3b3',
        color: 'black',
        // ... diğer buton stilleri
    }
}
```

---

**NOT:** Bu dosyayı custom dialog box font değişikliği yaparken okuyacaksın! 