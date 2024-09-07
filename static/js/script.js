$(document).ready(function() {
    let waitingForTeachingInput = false;
    let lastUserInput = '';

    $('#send-btn').click(function() {
        sendMessage();
    });


    $('#user-input').keypress(function(event) {
        if (event.which === 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        let userInput = $('#user-input').val().trim();
        if (userInput === "") return;
        $('#user-input').val('');
        $('#chat-messages').append('<div class="chat-message user-message">' + userInput + '</div>');
        $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);

        if (waitingForTeachingInput) {

            handleTeachingResponse(userInput);
        } else {

            sendAjaxRequest(userInput);
        }
    }

    function sendAjaxRequest(userInput) {
        lastUserInput = userInput;

        $.ajax({
            type: 'POST',
            url: '/get_response',
            dataType: 'json',
            data: { user_input: userInput },
            success: function(response) {
                console.log('Response received:', response);

                if (response.teach_flag) {

                    waitingForTeachingInput = true;
                    $('#chat-messages').append('<div class="chat-message bot-message">I don\'t know the answer. Can you teach me?... Type your answer or \'skip\' to skip.</div>');
                    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
                } else {
                    // Append the bot's message as usual
                    $('#chat-messages').append('<div class="chat-message bot-message">' + response.response + '</div>');
                    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function handleTeachingResponse(userInput) {
        waitingForTeachingInput = false;

        if (userInput.toLowerCase() === 'skip') {

            $('#chat-messages').append('<div class="chat-message bot-message">Okay, no worries! Let me know if there is anything else I can help with.</div>');
            $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
        } else {

            $.ajax({
                type: 'POST',
                url: '/teach',
                data: { user_input: lastUserInput, new_answer: userInput },
                success: function(teachingResponse) {
                    console.log('Teaching response received:', teachingResponse);
                    $('#chat-messages').append('<div class="chat-message bot-message">' + teachingResponse.response + '</div>');
                    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }
});
