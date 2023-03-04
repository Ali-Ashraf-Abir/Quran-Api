//menu bar
function menuBar(){

    const menu=document.getElementById('menu')
    const menuButton=document.getElementById('menu-button')

    document.getElementById("toggle-menu").addEventListener('click',function(){
        menu.classList.remove("hidden")
        menuButton.classList.add("hidden")



    })

    document.getElementById("menu-close").addEventListener('click',function(){

        menu.classList.add("hidden")
        menuButton.classList.remove("hidden")
    
    })





}




let currentlyDisplaying="none"


//main function
function fetchSurahInfos(){


    url= 'http://api.alquran.cloud/v1/quran/quran-uthmani'
    url2='http://api.alquran.cloud/v1/quran/en.asad'
    url3='https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_bn.json'
    fetch(url)
    .then(res=>res.json())
    .then(data=>getSurahData(data.data))

    fetch(url2)
    .then(res=>res.json())
    .then(data=>getSurahDataEnglish(data.data))


    fetch(url3)
    .then(res=>res.json())
    .then(data=>getSurahDataBangla(data))

    const getSurahData=(data)=>{

        i=0
        for(let surah of data.surahs){



            const surahSection=document.getElementById("surah-names")
            surahSection.innerHTML+=`   

                <div class="text-center text-xl mt-2 font-semibold grid grid-cols-2 cursor-pointer surah" >
                <div>
                <span class="english">${surah.englishName}</span>
                </div>
                <div>
                <button class="px-4 py-2 bg-[#b09af8] rounded-lg" id="surah-${i}">Read It</button>
                </div>
                </div>
            `





            i++


        }

        
        for(let i=0;i<data.surahs.length;i++){

        document.getElementById("surah-"+i).addEventListener('click',function(){

            currentlyDisplaying=i
            const surahHeading=document.getElementById("surah-name")
            surahHeading.innerText=data.surahs[i].englishName
            const surahAyah=document.getElementById("surah-ayah")
            surahAyah.innerHTML=""
            for(let ayah of data.surahs[i].ayahs){

                console.log(ayah)

                surahAyah.innerHTML+=`
                <p class="bg-[#2b2441] text-white lg:text-2xl text-xl font-semibold mt-4 py-2 px-4">${ayah.numberInSurah}. ${ayah.text}</p>
                
                `
            }


            document.getElementById("arabic-translation").addEventListener('click',function(){
                surahAyah.innerHTML=" "
                if(typeof(currentlyDisplaying)!='string'){
                for(let ayah of data.surahs[currentlyDisplaying].ayahs){
                    surahAyah.innerHTML+=`
                    <p class="bg-gray-900 text-white lg:text-2xl text-xl font-semibold mt-4 py-2">${ayah.numberInSurah}. ${ayah.text}</p>
                    `
                }
            }
                })





        })
    }



    }

    const getSurahDataEnglish=(data)=>{
        console.log(data.surahs[0].ayahs)




        const surahAyah=document.getElementById("surah-ayah")

            document.getElementById("english-translation").addEventListener('click',function(){
                if(typeof(currentlyDisplaying)!="string"){
                surahAyah.innerHTML=" "
                if(typeof(currentlyDisplaying)!='string'){
                for(let ayah of data.surahs[currentlyDisplaying].ayahs){
                    surahAyah.innerHTML+=`
                    <p class="bg-gray-900 text-white lg:text-2xl text-xl font-semibold mt-4 english py-2">${ayah.numberInSurah}. ${ayah.text}</p>
                    `
                }
            }}
                })
    
    
    
          

    }

    const getSurahDataBangla=(data)=>{

        const surahAyah=document.getElementById("surah-ayah")

        document.getElementById("bangla-translation").addEventListener('click',function(){
            surahAyah.innerHTML=" "
            if(typeof(currentlyDisplaying)!='string'){
            for(let ayah of data[currentlyDisplaying].verses){
                surahAyah.innerHTML+=`
                <p class="bg-gray-900 text-white lg:text-2xl text-xl font-semibold mt-4 py-2">${ayah.id}. ${ayah.text}</p>
                <p class="bg-gray-900 text-white lg:text-2xl text-xl font-semibold py-2"> ${ayah.translation}</p>
                `
            }
        }
            })

    }


    





}






fetchSurahInfos()
menuBar()

