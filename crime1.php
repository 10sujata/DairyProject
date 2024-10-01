(function ($) {
    'use strict';
    $(document).ready(function () {
        const showFirestoreDatabase = () => {
            const db = firebase.firestore();
            const firestoreEl = jQuery('#custom-firebase');
			var param = getUrlVars();
			console.log(param);
            // You can get the collectionName and documentName from the shortcode attribute
            const collection_video = 'videos';
			const collection_trials = 'trials';
			const collection_podcast = 'podcast';
			const collection_article = 'articles';
			const collection_police_reports = 'police_reports';
			const collection_audio = 's911s';
			const collection_photos = 'photos';
			const collection_profiles = 'profiles';
            const documentName = param.id;
			var html = '';
			var status = false;
            if (documentName) {
                const docVideo = db.collection(collection_video).doc(documentName);
				const doctrials = db.collection(collection_trials).doc(documentName);
				const docPodcast = db.collection(collection_podcast).doc(documentName);
				const docArticle = db.collection(collection_article).doc(documentName);
				const docPoliceReports = db.collection(collection_police_reports).doc(documentName);
				const docAudio = db.collection(collection_audio).doc(documentName);
				const docPhoto = db.collection(collection_photos).doc(documentName);
				const docProfile = db.collection(collection_profiles).doc(documentName);
                docVideo.get().then(doc => {
                    if (doc.exists) {
						var data = doc.data();
						console.log("video data",data)
						status = true;
						html = `<embed class="card-img-top" width="150" src="https://www.youtube.com/v/${data.youtube_id}" wmode="transparent" type="application/x-shockwave-flash" allowfullscreen="true" title="Adobe Flash Player">`;
						html += `<a href="http://www.youtube.com/embed/${data.youtube_id}" target="_blank">${data.title}</a>`;
						html += `<p>${data.description}</p>`;
						firestoreEl.append(html);
                    }
                }).catch(error => {
                    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
                });

				doctrials.get().then(doc => {
                    if (doc.exists) {
						var data = doc.data();
						status = true;
						html = `<embed class="card-img-top" width="150" src="https://www.youtube.com/v/${data.youtube_id}" wmode="transparent" type="application/x-shockwave-flash" allowfullscreen="true" title="Adobe Flash Player">`;
						html += `<a href="http://www.youtube.com/embed/${data.youtube_id}" target="_blank">${data.title}</a>`;
						html += `<p>${data.description}</p>`;
						firestoreEl.append(html)
                    }
                }).catch(error => {
                    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
                });

				docPodcast.get().then(doc => {
                    if (doc.exists) {
                        var data = doc.data();
						status = true;
						html = `<img src="${data.image}" class="avarst">`;
						html += `<a href="${data.audio}" target="_blank">${data.title}</a>`;
						html += `<p>${data.description}</p>`;
						firestoreEl.append(html)
                    }
                }).catch(error => {
                    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
                });

				docPoliceReports.get().then(doc => {
                    if (doc.exists) {
                        var data = doc.data();
						status = true;
						html =`<a href="${data.url}" target="_blank">${data.title}</a>`;
						html += `<p>${data.description}</p>`;
						firestoreEl.append(html)
                    }
                });

				docArticle.get().then(doc => {
                    if (doc.exists) {
                        var data = doc.data();
						status = true;
						html = `<a href="${data.url}" target="_blank">${data.title}</a>`;
						html += `<p>${data.description}</p>`;
						firestoreEl.append(html)
                    }
                });

				docAudio.get().then(doc => {
                    if (doc.exists) {
                        var data = doc.data();
						status = true;
						html = `<img src="https://crimedoor.com/wp-content/themes/betheme/images/icons/911.jpg?_t=1602829462" class="avarst">`;
						html += `<a href="${data.audio_url}" target="_blank">${data.title}</a>`;
						html += `<p>${data.description}</p>`;
						firestoreEl.append(html)
                    }
                }).catch(error => {
                    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
                });

				docProfile.get().then(doc => {
                    if (doc.exists) {
                        var data = doc.data();
						var map;
						var s1 = data.location.geopoint.df;
						var s2 = data.location.geopoint.wf;
						var center = new google.maps.LatLng(s1, s2);
							console.log("customer data",data);
						console.log("customer data",data.location.geopoint.wf);

						function init() {

							var mapOptions = {
								zoom: 13,
								center: center,
								mapTypeId: google.maps.MapTypeId.ROADMAP
							}

							map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

							var marker = new google.maps.Marker({
								map: map,
								position: center,
							});
						}

						status = true;
						html =`<body onload="init();"><div class="pabli-fd">
	<div class="under-full">
	<div class="under-left">
		<img src="${data.img_url}" class="avarst">
    </div>

   </div>

<div class="full-palish">
<div class="palish-left">
      <label for="">Name:</label>
</div>

	<div class="palish-right">
     <a href="">${data.profile_name}</a>
    </div>
</div>

<div class="full-palish">
<div class="palish-left">
      <label for="">Publication Date</label>
</div>

	<div class="palish-right">
     <a href="">${data.dateofcrime}</a>
    </div>
</div>

<div class="full-palish">
<div class="palish-left">
      <label for="">Victim</label>
</div>

	<div class="palish-right">

     <a href="">${data.victim}</a>
    </div>
</div>


<div class="full-palish">
<div class="palish-left">
      <label for="">City</label>
</div>

	<div class="palish-right">

     <a href="">${data.profile_city}</a>
    </div>
</div>

<div class="full-palish">
<div class="palish-left">
      <label for="">State</label>
</div>

	<div class="palish-right">

     <a href="">${data.profile_state}</a>
    </div>
</div>

<div class="full-palish">
<div class="palish-left">
      <label for="">Country</label>
</div>

	<div class="palish-right">

     <a href="">${data.profile_country}</a>
    </div>
</div>

<div class="full-palish">
<div class="palish-left">
      <label for="">ZIP Code</label>
</div>

	<div class="palish-right">

     <a href="">${data.zip}</a>
    </div>
</div>

<div class="full-palish">

<div class="palish-left">
      <label for="">Location</label>
</div>

	<div class="palish-right">
     <section id="main">
<div id="map_canvas" style="width:500px; height: 200px;"></div>
</section>
    </div>

</div>

<div class="full-palish">
   <div class="yout-mri">
       <div class="yout-ariay">
         <iframe width="420" height="315"                  src="https://www.youtube.com/embed/tgbNymZ7vqY">
         </iframe>
 <h4>What Nile didn't show you!? Behind the scenes of
                            'Aerial Hoop Challenge'</h4>
 <p>Oh I think we nailed it!! Big love guys, subscribe for more BTS Personal Insta </p>
<p>https://www.instagram.com/
joannajwilson/ Tutoring Insta ...</p>
</div>
<div class="yout-ariay">
         <iframe width="420" height="315"                  src="https://www.youtube.com/embed/tgbNymZ7vqY">
         </iframe>
 <h4>What Nile didn't show you!? Behind the scenes of
                            'Aerial Hoop Challenge'</h4>
 <p>Oh I think we nailed it!! Big love guys, subscribe for more BTS Personal Insta </p>
<p>https://www.instagram.com/
joannajwilson/ Tutoring Insta ...</p>
</div>



</div>

</div>

</div></body>`;
						html += `<a href="${data.img_url}" target="_blank"></a>`;
						html += `<p></p>`;
						firestoreEl.append(html)
                    }
                }).catch(error => {
                    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
                });

				docPhoto.get().then(doc => {
                    if (doc.exists) {
                        var data = doc.data();
						status = true;
						html = `<img src="${data.original_image}" class="avarst">`;
						html += `<a href="${data.original_image}" target="_blank">${data.title}</a>`;
						firestoreEl.append(html)
                    } else if(!status) {
						html = '<h3 style="text-align: center">Content is missing!</h3>';
						firestoreEl.append(html)
					}
                }).catch(error => {
                    console.error('Please check your collection and document name in the [firestore] shortcode!', error);
                });
            } else {
                html = '<h3 style="text-align: center">Please check your collection and document name in the [firestore] shortcode!</h3>';
				firestoreEl.html(html);
				status = true;
            }

        }

        showFirestoreDatabase();

    })
})(jQuery)

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
