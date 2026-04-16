$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);

    // New button on click
    $('.cuddle-button').click(clickedCuddleButton);

    $('.shelterButton').click(clickedShelterPet);
    $('.sheltered-beast-list').on('click', '.sheltered-beast-item', clickedShelteredBeast);
  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var beastTypes = {
      jobberknoll: {
        name:"jobberknoll",
        weight:10,
        happiness:10,
        trust:8,
        image: "images/Jobberknoll.webp"
      },
      puffskein: {
        name:"puffskein",
        weight:5,
        happiness:10,
        trust:8,
        image: "images/Puffskein.webp"
      },
      niffler: {
        name:"niffler",
        weight:10,
        happiness:10,
        trust:4,
        image: "images/Niffler.webp"
      },
      hippogriff: {
        name:"hippogriff",
        weight:50,
        happiness:10,
        trust:2,
        image: "images/Hippogriff.webp"
      }
    };

    var pet_info = {
      name: "My Pet",
      weight: 50,
      happiness: 10,
      trust: 8,
      image: ""
    }

    var shelteredBeasts = [];


    function clickedShelterPet() {
      var selectedBeast = $('#beastType').val();
      var chosenName = $('#beastNameInput').val();

      var selectedShelter = beastTypes[selectedBeast];

      var newBeast = {
        name: chosenName || selectedShelter.name,
        weight: selectedShelter.weight,
        happiness: selectedShelter.happiness,
        trust: selectedShelter.trust,
        image: selectedShelter.image,
        type: selectedBeast
      };

      shelteredBeasts.push(newBeast);
      pet_info = newBeast;

      $('.pet-image').attr('src', selectedShelter.image);

      updatePetInfoInHtml();
      updateShelteredBeastsInHtml();
      
    }
  
    function clickedTreatButton() {
      // Increase pet happiness
      ++pet_info.happiness;
      // Increase pet weight
      ++pet_info.weight;
      ++pet_info.trust;
      $('.message').text("Your beast liked the delicous treat!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      ++pet_info.happiness;
      // Decrease pet weight
      --pet_info.weight;
      $('.message').text("Your beast had fun playing!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      --pet_info.happiness;
      // Decrease pet weight
      --pet_info.weight;
      $('.message').text("Your beast had a good workout!");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedCuddleButton() {
      // Decrease pet happiness
      ++pet_info.happiness;
      // Decrease pet weight
      ++pet_info.trust;
      $('.message').text("Your beast loves to cuddle!");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedShelteredBeast() {
      var beastIndex = $(this).data('index');
      var selectedBeast = shelteredBeasts[beastIndex];

      pet_info = selectedBeast;

      $('.pet-image').attr('src', pet_info.image);

      updatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if(pet_info.weight < 2 ){
        --pet_info.trust;
        pet_info.weight = 2;
      }
      if(pet_info.happiness < 1){
        --pet_info.trust;
        pet_info.happiness = 1;
      }
      if(pet_info.trust <= 0){
        //animal will leave and will be deleted from users vivarium
        pet_info.happiness = 10;
        pet_info.weight = 10;
        pet_info.trust = 10;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.trust').text(pet_info['trust']);
    }


    function updateShelteredBeastsInHtml() {
      $('.sheltered-beast-list').empty();

      shelteredBeasts.forEach(function (beast, index) {
        $('.sheltered-beast-list').append(
          '<li class="sheltered-beast-item" data-index="' + index + '">' +
          beast.name + ' (' + beast.type + ')' +
          '</li>'
        );
      });
    }

    function outputPetMessage(){
      $('.message').text();
    }
  