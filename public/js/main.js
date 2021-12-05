// Jquery e document.querySelector (this?, contexto e escopo)
const $ = document.querySelector.bind(document)

function TabNavigation() {
    // Qual a diferença de const e var? 
    const html = {
        links: [...$('.tab-links').children],
        contents: [...$('.tab-content').children],
        defaultTab: $('[data-default]')
    }

    //Sumir com todas as seções
    function hideAllTabContent(){
        //Para cada elemento esconda ele
        html.contents.forEach(section => {
            section.style.display = "none"
        })
    }

    //Remover as classes ativas, para que apenas um fique ativado
    function removeAllActiveClass(){
        html.links.forEach(tab => {
            tab.className = tab.className.replace(" active", "")
        })
    }

    //Mostrar a tab em que cliquei, qual está clicada e seu conteúdo
    function showCurrentTab(id){
        const tabContent = $('#' + id)
        tabContent.style.display = "block"
    }

    // Selecionando a tab
    function selectTab(event){
        hideAllTabContent()

        const target = event.currentTarget
        showCurrentTab(target.dataset.id)

        removeAllActiveClass()
        target.className += " active"
        
    }

    //Ouvindo as mudanças 
    function listenForChange(){
        html.links.forEach(tab => {
            tab.addEventListener('click', selectTab)
        })
    }

    //Iniciar
    function init(){
        hideAllTabContent()
        listenForChange()

        html.defaultTab.click()
    }

    return {
        init
    }
    
}

window.addEventListener('load', () =>{
    const tabNavigation = TabNavigation()
    tabNavigation.init()
})