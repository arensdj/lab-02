'use strict';

// function Photo(photoData) {
//   this.image_url = photoData.image_url;
//   this.title = photoData.title;
//   this.description = photoData.description;
//   this.keyword = photoData.keyword;
//   this.horns = photoData.horns;
// }

Photo.photoDataSet = [];
Photo.photosToRender = [];

Photo.readJson = (pageUrl = 'data/page-1.json') => {
  $.get(pageUrl, 'json')
    .then(data => {
      Photo.photoDataSet = [];
      data.forEach(photo => {
        Photo.photoDataSet.push(photo);
      });
    })
    .then(() => {
      Photo.render()
    })
    .then(Photo.createOptions)
    //.then()
    ;
};

function Photo (photoObject) {
  for (let key in photoObject) {
    this[key] = photoObject[key];
  }
}

Photo.prototype.toHtml = function () {
  let $htmlTemplate = $('#photo-gallery-template').html();
  let templateRender = Handlebars.compile($htmlTemplate);
  console.log(templateRender);
  return templateRender(this);
};

Photo.render = () => {
  Photo.photoDataSet.forEach(photoObject => {
    Photo.photosToRender.push(new Photo(photoObject));
  });
  console.log(Photo.photoDataSet);
  Photo.photosToRender.forEach(ourPhotoObject => {
    $('#photo-template').append(ourPhotoObject.toHtml());
  });
};

Photo.createOptions = () => {
  const $selector = $('select');
  let optionsAlreadyIncluded = [];
  Photo.photoDataSet.forEach((photo) => {
    if (!optionsAlreadyIncluded.includes(photo.keyword)) {
      optionsAlreadyIncluded.push(photo.keyword);
      let $newOption = $('select option:first').clone();
      $newOption.text(photo.keyword);
      $newOption.val(photo.keyword);
      $selector.append($newOption);
    }
  });
  // $selector.on('change', function() {
  //   Photo.filterPhotos($(this).val());
  // });
};

$(() => Photo.readJson());

// Photo.allPhotos = [];

// Photo.prototype.render = function () {

//   $('main').append('<section class="clone"></section>');
//   const $photoClone = $('section[class="clone"]');


//   const $photoHtml = $('#photo-template').html();


//   $photoClone.html($photoHtml);


//   $photoClone.find('h2').text(this.title);
//   $photoClone.find('img').attr('src', this.image_url);
//   $photoClone.find('p').text(this.description);
//   $photoClone.removeClass('clone');
//   $photoClone.addClass(this.title);
//   $photoClone.attr('data-keyword', this.keyword);
// }

// Photo.readJson = () => {
//   $.get('./data/page-1.json', 'json')
//     .then(data => {
//       console.log(data);
//       data.forEach(photo => {
//         Photo.allPhotos.push(new Photo(photo));
//       });
//     })
//     .then(Photo.loadPhotos)
//     .then(Photo.createOptions);
// };

// Photo.createOptions = () => {
//   let $selector = $('select');
//   // console.log(Photo.allPhotos);
//   Photo.allPhotos.forEach((photo) => {
//     let $newOption = $('select option:first').clone();
//     $newOption.text(photo.keyword);
//     $newOption.val(photo.keyword);
//     $selector.append($newOption);
//   });
//   $selector.on('change', function() {
//     Photo.filterPhotos($(this).val());
//   });
// };

// Photo.filterPhotos = (filter) => {
//   $('section').hide();
//   Photo.allPhotos.forEach((photo) => { //eslint-disable-line
//     $(`section[data-keyword=${filter}]`).show();
//   });
// }

// Photo.loadPhotos = () => {
//   Photo.allPhotos.forEach(photo => photo.render());
// };

// $(() => Photo.readJson());


