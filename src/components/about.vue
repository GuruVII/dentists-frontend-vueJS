<template>
<div id="about">
	<h1 class="title">O STRANI</h1>
	<div class="wrapper">
		<h2>Zakaj je stran nastala?</h2>
		<p>Ta stran je nastala kot hobi projekt, bi izboljšal lastno znanje razvoja spletnih strnai in stran s katero želim olajšati posasmezniku iskanju zobozdravnika.</p>
		<p> Kar nekaj ljudi v moji bližini mi je reklo, da iskanje osebnega zobozdravnika ni ravno najlažje stvar. Saj večina ljudi išče nekoga, ki je dober, nima dolgih čakalni vrst in sprejema nove paciente. Ponavadi povprašeš družino in prijatelje, če koga svetujejo. V kolikor ima ta zobozdravnik dolge čakalne vrste ali pa na sprejema novih pacientov, greš verjetno na splet, pogledat koga svetujejo drugi, mogoče pogledaš na stran kakega zdravstvenega doma in pošlješ kak email ali pa pokličeš. Ampak zelo pogosto zveš, da je čakalna doba dolga ali pa, da zobozdravnik ne sprejema novih pacientov. To se je dogajalo tudi meni, vsaj dokler nisem čisto po naključju našel, da ZZZS vsako četrtletje izda excelovo datoteko, z vsemi zobozdravniki, ki jih krije zavarovalnica in podatkom povprečnega števila opredeljenih oseb na zobozdravnika.</p>

		<h2>Kaj je to povprečno število opredeljenih oseb na zobozdravnika?</h2>
		<p>Ta številka nam pove koliko pacientov imajo imajo zobozdravniki napram drugim zobozdravnikom na območju območne enote ZZZS. Za podatek je pomeben, ker, če citiram ZZZS: "Izvajalec oziroma zobozdravnik, ki ima sklenjeno pogodbo z ZZZS in izpolnjuje pogoje za izbranega zobozdravnika, je dolžan sprejeti vse zavarovane osebe, ki si ga izberejo. Odkloni jih lahko, ko za 10 % preseže povprečno število opredeljenih oseb na zobozdravnika v svoji dejavnosti na območju območne enote ZZZS, kjer ima sedež dejavnosti." Bolj preprosto povedano, dokler je povprečje pod 110%, te zobozdravnik ne sme zavrniti.</p>

		<h2>Kako natačni so podatki na strani?</h2>
		<p>Podatki na strani so zgolj informativne narave. Točnosti podatkov ne morem zagotovoviti, saj uporabljam javno dostopne podatke, ki jih je ustvaril ZZZS.</p>

		<h2>Kontaktiral sem zobozdravnika, a me je zavrnil, na vaši strani pa piše, da ne dosega povprečja</h2>
		<p>Kot sem že napisal, vsi podatki so informativne narave. Tudi najnovejši podatki so stari nekaj mesecev. V kolikor mislite, da vas zobozdravni ne bi smel zavrniti, potem, če ponovno citiram ZZZS: "V primeru, da izvajalec oziroma zobozdravnik zavarovani osebi ne omogoči izbire, pa iz podatkov iz tabele izhaja, da izbire zavarovani osebi ne bi smel odkloniti, se zavarovana oseba lahko pritoži in sicer najprej na vodstvo javnega zdravstvenega zavoda, če gre za zobozdravnika iz javnega zavoda. V kolikor spora v okviru javnega zdravstvenega zavoda ni moč rešiti, se zavarovana oseba lahko pritoži na pristojno območno enoto ZZZS. V primeru zasebnih zobozdravnikov, ki imajo sklenjeno pogodbo z ZZZS, se zavarovana oseba lahko pritoži neposredno na pristojno območno enoto ZZZS."</p>

		<h2>Zobozdravnik ima zelo nizko povprečje ali celo 0%, zakaj?</h2>
		<p>Je mnogo razlogov zato. Najbolj verjeten je ta, da na dan zbiranja podatkov (28.2., 31.5., 31.8. in 30.11) ni imel pacientov. Možno je tudi, da gre za novega zobozdravnika ali pa da se je zgodila napaka stvarjenju podatkov.</p>

		<h2>Vir podatkov</h2>
		<p>Vir podatkov je ma tej <a href="https://partner.zzzs.si/wps/portal/portali/aizv/zdravstvene_storitve/izbira_osebnega_zdravnika/sezn_akt_zob_za_odrasle_in_mladino/">povezavi</a>.</p>
	</div>
</div>
</template>
<script>
export default {
	name: 'about',
}

</script>
<style lang="scss">
$main-bg-color: #15cabf;
$main-light-font-color: #fafafa;
$main-dark-font-color: #263238;
@mixin icon-size($size) {
    font-size: $size;
    width: $size;
    min-width: $size;
    height: $size;
    min-height: $size;
}
@mixin flex-box($flex-flow) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: $flex-flow;
    flex-flow: $flex-flow;
}
@mixin justify-content($position) {
    -webkit-justify-content: $position;
    justify-content: $position;
}
@mixin align-items($position) {
    -webkit-align-items: $position;
    align-items: $position;
}
@mixin align-self($position) {
    -webkit-align-self: $position;
    align-self: $position;
}
#about {
	@include flex-box(row wrap);
    //some browsers do not support space-evenly
    @include justify-content(center);
    .title {
    	 width: 100%; 
    	 text-align: center;
    }
    .wrapper {
	    @include flex-box(row no-wrap);
	    //some browsers do not support space-evenly
	    @include justify-content(flex-start);
	    @media(min-width: 600px) {
	        width: 80%;
	        margin: 10px auto 0 auto;
	    }
	    h2 {
	    	width: 100%;
	    }
	    p {
	    	color: $main-dark-font-color;
	    	margin: 3px 0 5px 0
	    }
	}
}

</style>