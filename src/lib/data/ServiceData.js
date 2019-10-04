
module.exports = {
    "Name": "serviceName",
    "TaskTemplate": {
        "ContainerSpec": {
            "Image": "nginx:alpine",
            "Env": [
                "FOO=bar",
                "BAZ=quux"
            ],
            "Args": [
              "npm",
              "start"
            ],
            // "Mounts": [
            //     {
            //         "ReadOnly": true,
            //         "Source": "web-data",
            //         "Target": "/usr/share/nginx/html",
            //         "Type": "volume",
            //         "VolumeOptions": {
            //             "DriverConfig": {},
            //             "Labels": {
            //                 "com.example.something": "something-value"
            //             }
            //         }
            //     }
            // ]
            // ,
            // "Hosts": [
            //     "10.10.10.10 host1",
            //     "ABCD:EF01:2345:6789:ABCD:EF01:2345:6789 host2"
            // ],
            // "User": "33",
            // "DNSConfig": {
            //     "Nameservers": [
            //         "8.8.8.8"
            //     ],
            //     "Search": [
            //         "example.org"
            //     ],
            //     "Options": [
            //         "timeout:3"
            //     ]
            // },
            // "Secrets": [
            //     {
            //         "File": {
            //             "Name": "www.example.org.key",
            //             "UID": "33",
            //             "GID": "33",
            //             "Mode": 384
            //         },
            //         "SecretID": "fpjqlhnwb19zds35k8wn80lq9",
            //         "SecretName": "example_org_domain_key"
            //     }
            // ]
        },
        "LogDriver": {
            "Name": "json-file",
            "Options": {
                "max-file": "3",
                "max-size": "10M"
            }
        },
        "Placement": {},
        "Resources": {
            "Limits": {
                "MemoryBytes": 104857600
            },
            "Reservations": {}
        },
        "RestartPolicy": {
            "Condition": "on-failure",
            "Delay": 10000000000,
            "MaxAttempts": 10
        }
    },
    "Mode": {
        "Replicated": {
            "Replicas": 1
        }
    },
    "UpdateConfig": {
        "Parallelism": 2,
        "Delay": 1000000000,
        "FailureAction": "pause",
        "Monitor": 15000000000,
        "MaxFailureRatio": 0.15
    },
    "RollbackConfig": {
        "Parallelism": 1,
        "Delay": 1000000000,
        "FailureAction": "pause",
        "Monitor": 15000000000,
        "MaxFailureRatio": 0.15
    },
    "EndpointSpec": {
        "Ports": [
            {
                "Protocol": "tcp",
                // "PublishedPort": 8080,
                "TargetPort": 3000
            }
        ]
    },
    "Labels": {
        "foo": "bar"
    }
}