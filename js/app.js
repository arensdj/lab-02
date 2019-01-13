'use strict';

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
      Photo.render(Photo.photoDataSet)
    })
    .then(Photo.createOptions);
};

function Photo (photoObject) {
  for (let key in photoObject) {
    this[key] = photoObject[key];
  }
}

Photo.prototype.toHtml = function () {
  let $htmlTemplate = $('#photo-gallery-template').html();
  let templateRender = Handlebars.compile($htmlTemplate);
  return templateRender(this);
};

Photo.render = (dataObj) => {
  Photo.photosToRender = [];
  dataObj.forEach(photoObject => {
    Photo.photosToRender.push(new Photo(photoObject));
  });

  $('#photo-template').empty();

  Photo.photosToRender.forEach(ourPhotoObject => {
    $('#photo-template').append(ourPhotoObject.toHtml());
  });
};

Photo.createOptions = () => {
  const $selector = $('#filter');
  $('.dynamic-option').remove();
  let optionsAlreadyIncluded = [];

  Photo.photoDataSet.forEach((photo) => {
    if (!optionsAlreadyIncluded.includes(photo.keyword)) {
      optionsAlreadyIncluded.push(photo.keyword);
      let $newOption = $('select option:first').clone();
      $newOption.text(photo.keyword);
      $newOption.val(photo.keyword);
      $newOption.addClass('dynamic-option');
      $newOption.attr('alt', photo.keyword);
      $selector.append($newOption);
    }
  });
  $selector.on('change', function() {
    Photo.filterPhotos(Photo.photoDataSet, $(this).val());
  });
};

Photo.sortPhotos = (dataObj, sortOn) => {
  if (sortOn === 'Horns') {
    console.log('horns');
    dataObj.sort((a, b) => {
      return a.horns - b.horns;
    });
  } else if (sortOn === 'Title') {
    console.log('title');
    dataObj.sort((a, b) => {
      if (a === b) return 0;
      return a.title > b.title ? 1 : -1;
    });
  }
  Photo.render(dataObj);
};

$('#sorter').on('change', function() {
  Photo.sortPhotos(Photo.photoDataSet, $(this).val());
});

Photo.filterPhotos = (dataObj, filter) => {
  const outputData = [];
  dataObj.forEach((val) => {
    if (val.keyword === filter) {
      outputData.push(val);
    }
  });
  Photo.render(outputData);
};

$(() => { 
  Photo.readJson(); 

  $('#button1').on('click', () => {
    Photo.readJson('/data/page-1.json');
  });

  $('#button2').on('click', () => {
    Photo.readJson('/data/page-2.json');
  });
});
