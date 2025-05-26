// App.jsx
import { fal } from "@fal-ai/client";
import { useEffect, useState } from 'react';
import {
    Container,
    FormWrapper,
    Input,
    Select,
    TextArea,
    Button,
    Overlay,
    OverlayImage,
    OverlayButtons,
    Loader,
    Heading,
    Label
} from './App.styles';

function App() {
    const [form, setForm] = useState({
        company: '',
        industry: 'Technology',
        font: '',
        finish: '',
        icon: '',
        colors: '',
        material: '',
        format: 'square',
        background: '',
        lighting: '',
        style: '',
    });

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [lastPrompt, setLastPrompt] = useState('');

    useEffect(() => {
        fal.config({ credentials: import.meta.env.VITE_FAL_KEY });
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generatePrompt = () => `
Create a professional logo for ${form.company}
Industry: ${form.industry}
Style/Description/Details: ${form.style || 'Modern corporate design with photorealistic rendering'}

Technical Specifications: 
- Background: ${form.background}
- Lighting: ${form.lighting}
- Finish: ${form.finish} elements

Brand Elements:
- Typography: ${form.font}
- Icons: ${form.icon}
- Colors: ${form.colors}
- Material simulation: ${form.material}
`;

    const generateImage = async (prompt) => {
        setLoading(true);
        setImageUrl('');
        try {
            const { data } = await fal.subscribe("fal-ai/flux", {
                input: {
                    prompt: prompt,
                    image_size: form.format,
                    num_images: 1,
                },
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        update.logs.map((log) => log.message).forEach(console.log);
                    }
                },
            });
            setImageUrl(data?.images?.[0]?.url || '');
        } catch (err) {
            console.error("Flux Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        if (!form.company) return alert("Company name is required");
        const prompt = generatePrompt();
        setLastPrompt(prompt);
        setShowOverlay(true);
        await generateImage(prompt);
    };

    const handleRegenerate = async () => {
        if (!lastPrompt) return;
        setImageUrl('');
        setLoading(true);
        await generateImage(lastPrompt);
    };

    return (
        <Container>
            <Heading>AI Logo Generator</Heading>
            <FormWrapper>
                <Label>Brand</Label>
                <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />

                <Label>Industry</Label>
                <Select name="industry" value={form.industry} onChange={handleChange}>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="">Other</option>
                </Select>

                <Label>Style / Description / Details</Label>
                <TextArea name="style" placeholder="Clean, minimalist, futuristic..." value={form.style} onChange={handleChange} rows="3" />

                <Button onClick={() => setShowAdvanced(!showAdvanced)} type="button">
                    {showAdvanced ? '↵ Hide Advanced Settings' : '↳ Advanced Settings'}
                </Button>

                {showAdvanced && (
                    <>
                        <Label>Format</Label>
                        <Select name="format" value={form.format} onChange={handleChange}>
                            <option value="square">Square (1:1)</option>
                            <option value="portrait_4_3">Standard (4:3)</option>
                            <option value="portrait_16_9">Wide (16:9)</option>
                        </Select>

                        <Label>Background</Label>
                        <Input name="background" placeholder="#000000, dark, transparent..." value={form.background} onChange={handleChange} />

                        <Label>Font</Label>
                        <Input name="font" placeholder="Bold sans-serif" value={form.font} onChange={handleChange} />

                        <Label>Icons</Label>
                        <Input name="icon" placeholder="Shield with circuit lines" value={form.icon} onChange={handleChange} />

                        <Label>Colors</Label>
                        <Input name="colors" placeholder="#000000, #FFD700, red, blue, gold" value={form.colors} onChange={handleChange} />

                        <Label>Lighting</Label>
                        <Select name="lighting" value={form.lighting} onChange={handleChange}>
                            <option value="">None</option>
                            <option value="Professional studio highlights">Professional studio highlights</option>
                            <option value="Natural sunlight">Natural sunlight</option>
                            <option value="Backlit">Backlit</option>
                            <option value="Dramatic spotlight">Dramatic spotlight</option>
                            <option value="Soft ambient lighting">Soft ambient lighting</option>
                            <option value="Moody low-key lighting">Moody low-key lighting</option>
                            <option value="High-key lighting">High-key lighting</option>
                            <option value="Golden hour glow">Golden hour glow</option>
                            <option value="Neon glow">Neon glow</option>
                            <option value="Color gels lighting">Color gels lighting</option>
                            <option value="Spotlight with shadows">Spotlight with shadows</option>
                            <option value="Diffused daylight">Diffused daylight</option>
                            <option value="Reflective bounce lighting">Reflective bounce lighting</option>
                        </Select>


                        <Label>Finish</Label>
                        <Select name="finish" value={form.finish} onChange={handleChange}>
                            <option value="">None</option>
                            <option value="Glossy">Glossy</option>
                            <option value="Matte">Matte</option>
                            <option value="Metallic">Metallic</option>
                            <option value="Brushed metal">Brushed metal</option>
                            <option value="Chrome">Chrome</option>
                            <option value="Pearlescent">Pearlescent</option>
                            <option value="Holographic">Holographic</option>
                            <option value="Frosted">Frosted</option>
                            <option value="Embossed">Embossed</option>
                            <option value="Textured">Textured</option>
                            <option value="Transparent">Transparent</option>
                            <option value="Velvet">Velvet</option>
                            <option value="Carbon fiber">Carbon fiber</option>
                        </Select>

                        <Label>Material</Label>
                        <Select name="material" value={form.material} onChange={handleChange}>
                            <option value="">None</option>
                            <option value="Glass">Glass</option>
                            <option value="Metal">Metal</option>
                            <option value="Plastic">Plastic</option>
                            <option value="Wood">Wood</option>
                            <option value="Stone">Stone</option>
                            <option value="Leather">Leather</option>
                            <option value="Fabric">Fabric</option>
                            <option value="Ceramic">Ceramic</option>
                            <option value="Paper">Paper</option>
                            <option value="Concrete">Concrete</option>
                            <option value="Carbon fiber">Carbon fiber</option>
                            <option value="Acrylic">Acrylic</option>
                            <option value="Rubber">Rubber</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Copper">Copper</option>
                        </Select>

                    </>
                )}

                <Button onClick={handleGenerate} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Logo'}
                </Button>
            </FormWrapper>

            {showOverlay && (
                <Overlay>
                    {loading ? (
                        <>
                            <Loader />
                            <p>Generating your logo...</p>
                        </>
                    ) : (
                        <>
                            <OverlayImage src={imageUrl} alt="Generated Logo" />
                            <OverlayButtons>
                                <Button onClick={() => setShowOverlay(false)}>Close</Button>
                                <Button onClick={handleRegenerate}>↻ Regenerate</Button>
                            </OverlayButtons>
                        </>
                    )}
                </Overlay>
            )}
        </Container>
    );
}

export default App;