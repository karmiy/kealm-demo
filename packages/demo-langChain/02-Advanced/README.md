## JsonOutputParser 的格式指令

```
The output should be formatted as a JSON instance that conforms to the JSON schema below.

As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

Here is the output schema:
{"type": "object", "properties": {"name": {"type": "string"}, "description": {"type": "string"}, "features": {"type": "array", "items": {"type": "string"}}, "advantages": {"type": "array", "items": {"type": "string"}}}}

Ensure the response can be parsed by Python json.loads
```