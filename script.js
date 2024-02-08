document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Hide login container
    document.getElementById('login-container').classList.add('hidden');
    // Show command-line interface
    document.getElementById('command-line').classList.remove('hidden');

    const code = `struct group_info init_groups = { .usage = ATOMIC_INIT(2) };

struct group_info *groups_alloc(int gidsetsize){

    struct group_info *group_info;

    int nblocks;

    int i;



    nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;

    /* Make sure we always allocate at least one indirect block pointer */

    nblocks = nblocks ? : 1;

    group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);

    if (!group_info)

        return NULL;

    group_info->ngroups = gidsetsize;

    group_info->nblocks = nblocks;

    atomic_set(&group_info->usage, 1);
}`;

    // Simulate typing effect
    typeCode(code);

    // Simulate access decision after typing
    setTimeout(() => {
        const accessGranted = Math.random() < 0.25;

        if (accessGranted) {
            // Update command-line interface content
            document.getElementById('command-line-interface').innerHTML += '<p class="access-granted">Access granted. Initiating secure data transfer...</p>';
            // Create button for further action
            const button = document.createElement('button');
            button.innerText = 'Access Secret Information';
            button.addEventListener('click', function() {
                window.location.href = 'https://example.com'; // Replace 'https://example.com' with your website URL
            });
            document.getElementById('command-line-interface').appendChild(button);
        } else {
            // Update command-line interface content
            document.getElementById('command-line-interface').innerHTML += '<p class="access-denied">Access Denied</p>';
            // Reset website after 5 seconds
            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    }, code.length * 20); // Wait for typing effect to finish
});

// Function to simulate typing effect
function typeCode(code) {
    const codeElement = document.getElementById('command-line-interface');
    const codeArray = code.split('');
    let i = 0;
    const typeInterval = setInterval(() => {
        codeElement.innerHTML += codeArray[i];
        i++;
        if (i === codeArray.length) {
            clearInterval(typeInterval);
        }
    }, 20);
}
