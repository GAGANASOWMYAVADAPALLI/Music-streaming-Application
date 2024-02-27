let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "https://img.freepik.com/premium-photo/watercolor-painting-father-kissing-his-daughter_791234-1979.jpg",
    name: "Nanna Nuvvu Na",
    music: "Downloads.mpeg",
  },
  {
    img: "https://i.pinimg.com/736x/10/f5/5d/10f55ddd13fadbc4b7bdad56edb5bd1d.jpg",
    name: "Pedave Palikina",
    music: "assets/music/Neyim Var Ki.mp3",
  },
  {
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgVFRUZGRgaGhsaHBsbGxsaGR0cGxoaGRsaIhsbIS0mGx0qIRkbJTclKi4xNDQ0GyM6PzozPi0zNDEBCwsLEA8QHRISHzMqJCo5MzUzMzMzMzM1MzMzMzUzMzMzMzMzMzMzMzMzPDMzMzMzMzMzMzMzMzMzMzMzMzMzM//AABEIAQsAvQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAgMHAQj/xAA8EAACAQIEAwYEBAQGAgMAAAABAhEAAwQSITEFQVEGEyJhcYEykaGxQsHR8AcjUuEUYnKCkqLC8RUzU//EABoBAAIDAQEAAAAAAAAAAAAAAAADAQIEBQb/xAAlEQACAgIBBAMBAAMAAAAAAAAAAQIRAyExBBIiQRNRYXGBkbH/2gAMAwEAAhEDEQA/AOzUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHlaMTiUtiXZVHViAPrVe7U9qreFlAy94AGOacqqZgmOZgwKoj9o3vjMttnIYgkqACpCsChuZmIHjHhjTUbaLlOuC8Y3ydMw/aHD3DFt85mNAQJ8i0A+1TLuMCjUGSYCgEsfbp57VTuE8WtpaN7/AA7hgAROUhs3w5XUsG0jXTzAM02u3A9xbZIW4wlys6AAwgcbRJ19ap8jJ7ENsNjS5IK5TyB0n8jW8YkAhW0Y8tYPoedJeLY9bagFEupzDOQ2YEQRnBGnUsI0qvrxxGLWrF1Mwg9xinbxAgHKlxvEsdRnA2gVPyeg7DoKOCJFZVReCdqs9xkNt0ZATctuwZgAYzIyA51A56EiDqNauuHvq6h0YMrCQRqCKvGaZVxo3UUUVcqFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAeVX+1PaRcGi+HPcuEhFkKugkszHRVHU1YDXCf4q8Sz4x0y5lTJbMMykEoHAEcszSdD8I2NVf4SkbeI48Yi49wrYdiWPhzvAB/C7qkv4T4QdQpHKajWb9plDs+aYy3Fd2MAgwymXQiRDa7axoSowiAeFJRW3OcsmoEyUhgfKDtuDIqdguAa5vCpLZpbYmR0GgnUT89aVSQ+KbHWJ4hduBVkFbYztBynOFMKVCKJJ3MttvS1O0eKtnPbF2HMlhbFxGkxOhGshtyNjpTvDcJuAszK4Dj8RDAnSXAGni303mlOK4Y6/DbRgYObIUfT/MCQY1iRIOxE1Xx9l+yVaGNv+IF4+EqubkHU2yxYwAAT4upIPMaHcQOKdqw6G3cwFp8xYKEYAjQtmLIzFSF10M+Yqv4jPbOW2G1OqsoQGTprbeWMzrKnXzqVgsVe071MtsrlZSSqFNvE9yWc6yFBbWJjlPbGhbtMn9l0uPnuOlzJbYle78Zt5VKgMQwuGBrAYajWToLz2S47cW53V66t200BLrK9t1cxFtkuaydYMk7VQv/AJ9riXbVtbeeyTctuEViyD40zZAZUZfEIPgkHatH+PD+BraEYhArquaM6sfCVVsobMMwI1E6RRtOwpNUfQwr2kHY/iffYS2WYs6qEclSuZlAGcBtSG0IPOaf09CAoooqQCiiigAooooAKKKKACiiigAooooAxrgn8RLUY+/b7vKXe2+csWLKypqoMBYII5mVPKu+GuVfxiwEGxiAQDPdnTXcupmdRowiOYqrRaL2Vvg/D5ZANYEk+51+lXnD4QZR6Aa/by1qtcGa1bRLly4qAooEkAsTroOgka9Zqy8N4nZu6W7qMRyV1J+QrPK2zbCkiZawqgHQDyH6/veo96yPv9qYRpUbEiBNVZZFM7Q4eDmiNNSNCJ5yKpy2WZpDPmSSIJkRJ0PIc66XiclwZSQZnSRr6VQuKcMazcDL8IbQnSJ5Hy86rCbTphkgmrRCwtxhcZrjAd4rKWf4YKkakbCD6VKwNvuVXNcSSrGFbUByMrCdZkdI86i8TZAAXQwwMGcq5h1gHYjXasOH45zcDahgVUHOgKydWErmaBynY8+eirVmV6dF6/gpdK3MQjMYcIVBIMlC2ZtOcMB7V2KuJdguJOMWzvnQwob4wjHZjB0iRz2gRXbAaZF2KkqPaKKKsVCiiigAooooAKKKKACiiigAooooA8qr9u+DDE4cS0d22fYGViG32IBnTpVorViLQdSp2YFT6EQahq0TF07OaX7K2baC1hEvuEtr4hbGgUaln99utV/GjE94HfhdgQd7bZWGkyrBt+XwxV5v4fUr00+Wg+1RWwuhkaef50iS5N0FpOzdZxH8sNqNNjuPI+dVbili09xe8t3brMSIDutsDzKghaf3PhitFjCyZE6bHmKS07QxcFdw74YDxcLxFlZHiXM4k6yVBB9wDTM8OtlCFLsh5OZj/kJ+dPe7bmSai40ZVMdKmab2WiqRyzjJS272XGZSAwI0deUg84/p5jpvXvCEw5IFy+LZTUBlbMSNRDrAEydNfKlXGr5fEO07MR/x2rzA3AWAKAzpy0JjruNNp3rQl4mCcvJlsw+Mt28Sot5TmAmM65Zg5g5csCSd2Gv9IrvPDrue2jHcqJ9Y1+tfM+DQnEJJBnKAQf8AMAARuOsV9I8DEWkERAjeeQoiqZWbtDOiiimiwooooAKKKKACiiigAoorVccKCxIAGpJ0AA3JNAGdL8XxizbnM4kToPE2kToOkiaoPaTt/cN02cGiPoQWYFj/AKsoPLUx01Ne8K7SDLmvvOUjMyoBoQfAiJJmTqxY6zHULci6iW3iHaa3a8WV2UbsIA3y7EyYOmg5Gq6n8VsH3gRrd0DWXUK6iCRsDmPsOdVDtrxxbyLatkqksWWCA5zkgzvlBJ05kk/hqoK8bAR0/P8AfWrR3tlXXo7bbxiXAbimUaXUwRKt4lMHbQ7GtAu5tSBHIHn+zVa7DcTF20bDHx25iedsmR/xJI9IphxA3rbqyNNssMy5QWA55WidRMTOo86TNXKjbjlcVQ0xTvkhUQv5kqvqdCQPnWm0pRgRCjKJAJgnmddh661qS+jRkutvBJt5oABMyp11AEQDrtSrE8QYZgj5iBAzKBLZyBAElhk8W41MVR45DItFnTEBh50j4rf36AE17wS1d1e84OmiquUAfMkmqz2w4rlVraGC2k9Bz96ptuhlxSbOfYnVif6izfWB9q34FTDagdCR+IAQsjYmd/2IjtM9BAHoP3NMeGLKtOjZk1B8RkMco9hy1Mac511o5t7LL2T4O3excyhgqPl8JI8PeqxgyCQu5idTzruXB7oZTGgzEgRGh/vNcj7D4Fbhe4hIDWznHNSIXLufAVmCNRBB2Fdb4FZy2l9I/X6zVIu5EzVRQ0Fe14K9pwoKKKKACiiigAooooAK5t/EPtEouphA8Koa5eUSS8KTbtaa+JssjnoOtdIJr5x4xj++xF12K5rjs2dcxGTOwVZzR4VCjbkPWoZKIzYhwe6RssibjADMxJmCw3ABnSJPXSm2EwF26iquYKRJJJE9Cf09Ky4XgWuKoVYa5udcwTYE66SPt5ib5hsIqgaagRPlSpS+h0YfZz3iPB3VlUBm0pa2AcLJEQT94rrLYRSZI8qhPw9AzGJmZG4130NUeVoasMZHKV4hcw11XQEOh0nSeqkcwRpXWuA8Tt4yyLiejoYJVuan7g8xrVU7ScJS4p8O2x2I9Kq/ZjiF7A4jvBDowy3EmA6+XIMDqD6jmatGXer9orKPxv8ADrzcLXkTHQwY9yPvUZsCqmYJbqY09ANBWzA9psJdWUuQdJVgQ6+REQfUEiovFeKrlItSzHmAco94qkpNcsdFuS0RsbxIW1Krqdv71zni6Fi1w69B06n0ireMI9wFdVA1Zj8TE9ANtOVIcZaWSNx8IHMzP3og0ymS0inMNIG5/ZNTcNhmu5baxnmAshc0RBzGBPiiD5EdKzxai2coEnruBrtHOp3Z9LdzFIhZkT8YnOWIMkDQGDO2p09DTr1ZmrZ0fsJwG9bWXzS2rEwpOsBRzI0Jk7x5a9OwygKoGwEa76VyzA9qSl5kXRBmS3b0jJbRhbMtBymSNJmJ5mr9wPHi7bDzGZjAJ16R6SCPalwlstOLoeA0UvHFLWc2y6hhuOU9J2nyrdcx1tYl1E+f7jatPa/oRaJdFeA17UEhRRRQAUUUUAar/wAJ9D9q+Z8CmZhpAA6gx7g6wM1fR3EcatpczSQdIESeekkSY5V8/dmMKLuIZV2a5G0HIC7memkCOVVbLxi+S9dnsLlRmYQTEk+Q3J/OmY4haBg3BPTnWPEO6RZuvlQfhnKD5mNT6VX345gUfKtrKxnxMhQeclvTnFJZpjXst6MGEgyKgYy4q6FlB8yBW2xiUFswINJ8VisORN2IOmpiZJGmsnXpS1su3VmnHkFTVF4pZCvpsatF5sK6N/g7sOu65i6+hVtY8wdKpvaLEOrAgx4dtNDIkfWr49Sopk3GyVwXGd3eUn4T4W9DsfY/nXT8MqkDauSdmXF27kuSPASGWJBkCYOnMmuh8AzJntEk922UHqCoI05aEaetNy4W0n96E4stNr/JnxXGLZS82gbQL65AR9TVPsOGVrhnwDKAd5iTv5U+7ZAhBlglmXQa+KYBn0n5Cqvh8Se7Qf1ETPUj+8VEsKwuuSVk+RWR+JWIXNGqAn+3zI+VL+HOQ6FQJzEsddfEBH5z1PlVi4oAy5QNWd19hqaS8OIU68iRsDrtp168tqL0Vryos+H4kuaLsuwJCuC63B4VkZyWDAxzHy59N7NWglsQDldmuCSGPjIMH05QdQa5dwSz3t4kevtKry6gV0bhmM7uLZkoF1HTMYEH2HMCndPhcl3EZsiXiHFsL3d5suxOYb5vFqfI6zynrWGDx7d8LbQwKhgNQ2kLz0cEyNNue4pjxW+jqtwnLC5SW02OmvU1WOJ2GuMj25Vk+BoO/WOYOxHQ+kdWM49ijLngx9km21wdD4PiAQbY3TYHfKZK/Lb2FNKpvAeLrcGeMt1CVuId9xmQx+IRK/1CDzq3W2BAIMg7HrXOzQ7ZDYO0bKKxzUZxSqLWjKisc1eZqmgtC/jdkNbk/gZWnpB1+hNUXAcCS3i/8QghXUll00YhhmEaeLcjkSa6LiEzoy/1Aj5iqrZwptnJmlRACndGnxDOTLA8gaVKNOzTjknBr6NOItz69efzpficI9yMzsQNen1puxAEmooM6kadOUedKnQ7HpCu7bIQgaj71Gw2FLgRy2kBh6a+tObrsEIJRm1ywGQRyDDMx9wflUHCtladNhMaAtOpAkwOW5qton3shY3hVv4ntoGGxVQjD0KxvXP+1lvkBJziIHKDXVuJ6pI6VzbjNvNcVOv9/wAhTcULdorndQI/YXhbM7XDI0yjznU7+1XngFsuzu2ua7cJ8wjlE/6ovyr3gOEyKsD1+n/r2qRwVWTDW2I8TqWjb4iz78hrJPSutLDajFcLbOZHJXc/8IgdqVXKixPiVomNM2QenxQPQmqbi7GW4g0GUk6f5YXT8qu3F8MXDLMs1u4ZOkEFGzeXwjT/AEjlVE4tjJyMu5Q8ogkhSseRVt6R1kNX7G9PL0S713+YANQojXq0T+fzpYLyq7jIphmM+MEkksAIcDpyqVhGAIJ1MkkdSB4fqfpSq4hzsRrBHPXXc1gaHpll7I45RccHchYjmwPwgn2HtXQcKkCW3bU+42+X2ri+GxDWnUpoVYMPUeXT9a6v2exoxSK/wj8Y8/6NeW/qB51vwdRGGN364/RE8cpyVe+RgtnvmDN8C/AusMTu5H0HlJ51vupAMEj0qaygbcqjuN650sspScmbo40o9qIWHv8AdXUdyMl1xauEqk94QTZuZ4mfCbes/g6VaMJxPusyXBImVZRuDJII5EH71VO0GF7zC3wJzd2XSNw9uLiEHkZSPc1nbx5u27V0TD21aAeZEn7/AErq4Es0dnPyx7JF+zV7m0oK616d6zFTzOaA9ZZelYn1oI2em5UbGWFOsDN19RFSFHvWWQVDSLJv0VO+NCOfSkeJxdwX+7e53dkoSrKFBLkDKHd5yiTGlWrimGKkvy/F9p9KW3rAcQwkfUe9ZnGns345ppMWYjuQ6p/iDlyMzPNs280oFWQZOrnWNAp6UobEMbqLYuZ1Ml2YArEmMuXWcuWSdJmnjcHtnrr0Cj8q1DCpa+EQOfU+pNV7lfBok1XN/wCiRix/LqhWUFzGuRqqCPKQQp+7fKpfaztWFPc2fG50MH4Z+7HkOXyqR2c4cUttIGYqCeepzGJ8oFb+hwty7vSOf1WXx7Sx4FNI/wAv61p4ZhWtoFcgkbxJAAUMx1HMKkjzrcpC6nQBWk+jCtqOGJy6yQPYvlM+cJt5V1ZulRz1tkRhndSRqczHyVfhX/lqfMGua8aweXEOnJLtz/i0XQP+5+VdSKiS5OhJknkomfbKJ9zXNcZdF/EXbwGVCdJ3IACgn1Cr8wKw9Y12pezRgu2LnuZJPQT660vttmUtGx166gn35/KpPFnyjL+JtY6DcVDwY8UnqPp+xXOZpR6UzW8wnwwD0Ezkjpsd+dXv+H+Jg5RzmehiI09/rVUDg2Mi7d5BBGogsfC3NPLcGeUU77GNFxT6D6j8wflScr8R+FeR1XNpWt6LZ8NeOaR3GhIxshZhvhOh9G0P3NIuAcKbJ3b3T/KAtBbYJ+AsCxAU5cxkgGNBTYPBq08DAFslQAWYs0cydJPyI9q3dH1Lx3Rk6rHdDEKN5rwmvSBzrwAbzTjEeA16IjesyJGleAVFhQIwqvdrc9yyyWrrW25OhOjb6xuvI+RNPr14JqxA/Oq4uJViR6mPv+/Sm4odzsiUq0c74XxvGBnsXrjkoMrqxzbjQhjup3BFWXA411H9a9D8Q9DW7j/BhcyumjiQrcoMnKw5qfoTIpPhsQU/l3BkcfhP3U/iH7NZ+qhJO/Rq6dxar2M7vaNRp3Tz7D6zVX7RcXuXdB4B0HP1NPFuKTVf4svjJ/etZoO2aJaQq7L8EJud9cg+Ihfbn85EeRq/YFMub/b9mpJ2dgW9dP5j++ifIbDzIp+mhzctPpr+td/BrGkjk5NydmeItZlI8yNPdx9QK0Wb6WnyXHC5rjMrMQoeEgwx0LBpld9J50wtAA66CAZ9AQfsKiYmO7YuBrbiCM0tcZoGX8TSAAN9KmSb5KoTdpuIhcPbtqQXuCDBmBlGaY9Y9Jqt3UyJABCAg66FjG5G8akx6eVPcJw+2167dW0ltUPdW0QKuqANcbwwC8kKT/lIml3Hrg0t7ePUzv4Qzeg1A9q53UW05v8AiN2KtRX9ZSMShJLtqT+v/r51KwGH0Zo2iPqfyJ9qaNhlI1PhaR8unzPtUNHi0R1YgD0AUH7/ADFY52or9HRSciPYtwlv/Vm+in9frT7sas3F0gST6Rv9TSfHXBnUDZU09x/b6087FmHYdAPr/wCqTO3FsfClJI6XYOgocVhZOgrJjSkOaI1yrBwZ5tD1OxI6Hl60iujSm3B8YLdrUbsfoF/Wm43QnMrRZGShR5V6VJ51pxN1UjNOpgAak+1b1vRzKNtx8oJOgAn5VXuIY66wOVio/pWJjpmPP0j86mYzGK48LciMsGROmusUrutlB8vtWjDj9yRScvSIi3C41Y+snN7yTNR2wxDZlJzjmTqfTl7VuxxCDvAPDIzjyJ0f25+/Svb65lkb1uXGhLRjiuJlMNfdVi5btO4RgfiVSV0/EsgbedUbsxxG5jkuWsS/jHitXsqjKw3WFAjaQfY1b2c9J3BB5giCpHMHaPOtHDeE2rTtkGUXAHG/hMAMnlrrI3g9KVPGr2MjKuClcU4pdwl4W8UjKY0dYZHXYOvl5cjUXi/GrLZDbuzJ8QhlIA11zDnXQ+McBs4tO7vjVZKOujISILA8xIEqdDA8jXMeFdmgmIvJiQWFgqMg2csSUMjXKVGbTUyBprXPfS1Ol7NS6huOy18Gxqq1vBg/zBbDu/S5cJuG0pYaNkYiY/CQPKz4NldZ3VlBEdNwfcGudcQwNx7uIy/GRZuqwICyrkGG20Uk+inpVy7G8RW9YzSM+Z8wGwbMToJMCCCBOx0rp4vFdr9cGSe/Ic3LRKwrZSCCD8W3IiRI9xWj/BmQzMXcRDGAFhg3hUaL66mJExU3KKCKa0mL4EuHwrW1dTJOdyCOly4znnAMmD5VQsbjMzsG0MCPKWOY+UQa6XjMXl8KQ1w/Cp67ZmjUINyfKKq/GezauVay0ug1D/C8STryJJY9NTWPqsLmqiuDVgyKLuXsquMxauw7swu0bgbDcgDl9ajOQcoHwgkn7x9ftVgxPDLaADu3V2MBSc4mNYI0gCem1LP/AIi4W+ExJ1IgeX35Vz8+GbfH+jVjnFJkK1ZN28ROWSonkAqifsB71YezdlreIIcasphlMqcpkQeXxHT1qVwvg4QREk7sef6CmNvBrbdCBGo+un509dI1hafNFPnXypriyy2hpFb4rXZ0FZmuOjps13OdMeBgQ4PUH5z+lLXNS+GaZten51aL2UmtGHFe0eW49kv3bhsqAwFaR4JblPQ8z6VL4nxNB3J7zM4BU218RYuAMw/0wZ5QfKsb+KcyWFt9IOZVOnQzy8qQshKOlm2uZpEoAiCDIl42GmignyrSs3bK1sR8Skqar+DDB4r4ZBWWIBkFSRJymPITHlU3FGR+/lVcwVtVBNzE+IAuo0W2GhgYUyWiSZJ5/J4t8th1uMIJRWYa6EgH6GulgzfIrZj6nD8b1wR8DcFwOhMjxL5RAI+hrDhbnJkOpQlDP+U6H3EVH7PXQzu3ItptyVR+VTHTJcbo4n/cNPqPtWz7RjPblrWQK8w9lWzTILBV32CklYHKGYnzqVP7isSuumh51F3yBjw+4M0XDBUkNrAPQ+QI1+lKuPYRTcW8uyg22nQsuYG20/5SXH+4dKl48FWW4NB8Df6SfCfZj8mNQy5uFxyBXfaSG5ctqIw8lKyb1Qh4pa7pMQyMQQjlG5yjZ0JPMwSPnU3sfhiqNcZVDXTnbKMqg6iFXkOcdSaj9rVjC3SojRR7OQh+c054ahtW1BJIgmBy0mPnp6sKe0nv2V40MyfKjXpWsqQhZjMA8/6V1+ZBNe7BSdQQAfIkAA+hI+tVsqePbnl68vatZtsNgoFbFUMXUiIaAeYBVWBHoSflWNtt1YDMpgxp6MPIjX5jlQpMk0PYncp9KxGGUcx8qmhprFkmiyxDNsDn8hS3HxrDHrseWtNWeDBpZxCTtqdvWdKH+koc2XlQeRAPzE1sZqX8Cu57CdRKmeqMVj6VPVfrXlpxSm0jvQdrZrc1KwGmb2/Oozis7LkT++tVVIlmTvaA0Sdfw2mafdUrB3uBCfgTbM4GaNvCk76/iOnQ1sxF66DC2XO+oa3l9yzAg+gNRGw928yq1xMqsO8trqIKnRrm/MHKAJiNpNOhjcpJCXJRjbID27K23vWl1thnuXGE5ggLgBjucwGi7eW1PuIWi+GdAYzWzB84kfWKWdtWFrAXlURKBANh42VIj0NM710JZzMYREljpACrqfkDXYxYuyNHNy5O+Vlf7E4oXLYYef1NWTG2s0Eb0l7FcO7jCoCCGcZyDuuY5lXygEVY2brT3LdoSkL0eND862l5rK5bBB5frWhkOg/fKp0yKaNty3mVlOoIOntSXhj/AP2A7rcCn2RCD7hpjzpuhI9P2KhYOwpuOp0zXFJ8/CgHzAA9KlOkwqxP2vtxg3XUF3trPPW4nP0p8UEgeYHsst9wKU9o7OfurcjL3wckc1tgvEdCQPrTobz6/U1ePBWRkyypHlFeFcyEdRA8juPqKzU0LoPepII6NMOPxKJHmNP36VhiTDJcG48LeamY+TR/yNbUEFhyzZh6NqfrNFxfkdD6UAeMvMUI9YWm5HcUXk5igsY4q1mHnyNI7juWYAhHtrnk+RgEddxTtL3LnUHieCS5leFzoQyzsY3RhzUjQj0NUyqTg1HkvhlGM05cCXsfxEZ7lovnJJuAyDvAfblOU+5q4K3SqPwlLhxpz2xbCB38LEgz4QNgDv5bbVdUmK83li4upLZ3FKMncXowc1hZmK3lJrYieQpajewlKjddwz3MxFx7aMTAAUsFPQsDB3qThcOqAIghR5yT1JO5YncnU1kda2DQE9a7yxRi7SONLJKSpsp38Q7v8uzb/wD0voseSnMT9B86kdoFzYe3YJg3riWz/oU94/sVQj3pZ2yfNjMHb38TOfmqr9jU/i+ZsThba7KLlw84AQJ7avT2vFIWWC2IrYDvUSw50B361K/f2qGgTPGNa7z7V7caPpzrBE6/n8qqWPQunrUC9HeGOUH7GKZNtSdGJu3J/qtnroUn7qflVoEMj8SUSnUpcAPnAIjz2+VMcLczIjHcqD7ka/Wk3GyQttp+G5GnRlM+uk1M4Fig9tgD8Dsh8oOZd/8AKwp64FsbIa9NYivaCTBxrPt+/rXhrM1pcxQBg66/vb9n616lzrXunzrBxz51IGN63Oo3qBcxBXRtD15H9iaYB6iYqwHXz6/nUp/ZUxwygsT6CmqbUo4YhCwdwT8p0pxbIrzfVy7sz/v/AA7nTx7cSMV6f2obEBAP5ipJPxECYjafX61ldpx2dTMrE9QNR5f3pUFsnK6Vmu2mkmvLrVuaorfnXeWzjlQ7RYCcbYvz4QuQjoylmEeRz/8AWmWFcNduPzAS2PYFzr6uB/tqH2nc97Z1/q/8a3cA1tOefeXNf95H5U1cFWNVXnUkHSZrSu378q2vt+/Kqy4JRhbWfEf3yrKsbWw962Jv7VVIszC82kUuw9om5c01LKB7Wx+bGp1zY+/3qIjkXHg7MseXht1PBBA7R4ZgqpMFX09QpKn6/Wk/ZjEhMXctfD3iBwOjoSG+at/0p92laVadfH9qpthyMfhTO5g+YLOpHy0psHcbZVrdHQ68Br2irEBFYXlkV6eVAoAjK8V6786xvbmsUq1WrIujxj5VGZoqSd6iXfz/AEqCTfg+dMrQpdg/1+9NF2rzGbeST/Wd3HqC/iMHFN+BY9LaMjSDmzfMR/40nvb1rYbeg+1P6SCnNp/Qjq3WNP8AT//Z",
    name: "calm down",
    music: "assets/music/Unutulacak Dunler.mp3",
  },
  {
    img: "https://img.freepik.com/premium-photo/portrait-indian-asian-young-family-four-sitting-white-flour-against-white-background-looking-camera_466689-8054.jpg",
    name: "Manam",
    music: "assets/music/Boyuk Umidler.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  now_playing.textContent =
    "Playing music" + (track_index + 1) + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );

    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      (curr_track.duration - durationMinutes * 60)
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}